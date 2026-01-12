import { NavigationContainer } from '@react-navigation/native'
import { useAuth } from '@/context/AuthContext'
import AuthStack from './AuthStack'
import MainStack from './MainStack'
import * as SplashScreen from 'expo-splash-screen'

SplashScreen.preventAutoHideAsync()

export default function RootNavigator() {
  const { isAuthenticated, loading } = useAuth()

  if (loading) return null

  return (
    <NavigationContainer
      onReady={() => {
        SplashScreen.hideAsync()
      }}
      // linking={{
      //     enabled: 'auto',
      //     prefixes: [
      //       // Change the scheme to match your app's scheme defined in app.json
      //       'helloworld://',
      //     ],
      //   }}
    >
      {isAuthenticated ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  )
}
