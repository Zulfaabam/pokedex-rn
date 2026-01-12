import { createContext, useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const AUTH_KEY = 'auth_session'

type AuthSession = {
  email: string
  accessToken: string
  expiresAt: number
}

type AuthContextType = {
  session: AuthSession | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  isAuthenticated: boolean
  loading: boolean
}

const AuthContext = createContext<AuthContextType>(null!)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    restoreSession()
  }, [])

  const restoreSession = async () => {
    try {
      const stored = await AsyncStorage.getItem(AUTH_KEY)
      if (!stored) return

      const parsed: AuthSession = JSON.parse(stored)

      // token expired
      if (parsed.expiresAt < Date.now()) {
        await AsyncStorage.removeItem(AUTH_KEY)
        return
      }

      setSession(parsed)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    if (!email.includes('@') || password.length < 6) return false

    const fakeToken = `fake-jwt-${Math.random().toString(36).slice(2)}`
    const expiresAt = Date.now() + 1000 * 60 * 60 // 1 hour

    const session: AuthSession = {
      email,
      accessToken: fakeToken,
      expiresAt,
    }

    await AsyncStorage.setItem(AUTH_KEY, JSON.stringify(session))
    setSession(session)
    return true
  }

  const logout = async () => {
    await AsyncStorage.removeItem(AUTH_KEY)
    setSession(null)
  }

  return (
    <AuthContext.Provider
      value={{
        session,
        login,
        logout,
        isAuthenticated: !!session,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
