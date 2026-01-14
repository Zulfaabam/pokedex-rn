import {
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Text,
  useColorScheme,
} from 'react-native'
import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'

export default function Login() {
  const theme = useColorScheme() ?? 'light'

  const { login } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const handleLogin = async () => {
    const ok = await login(email, password)
    if (!ok)
      setErrorMsg(
        'Email should contains @ and password should be min 6 characters'
      )
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Welcome to Pokedex!</ThemedText>
      <ThemedView style={styles.form}>
        <TextInput
          placeholder='example@email.com'
          onChangeText={setEmail}
          style={[
            styles.input,
            { color: theme === 'dark' ? '#f0f0f0' : '#000' },
          ]}
          placeholderTextColor='gray'
        />
        <TextInput
          placeholder='Password min 6 characters'
          secureTextEntry
          onChangeText={setPassword}
          style={[
            styles.input,
            { color: theme === 'dark' ? '#f0f0f0' : '#000' },
          ]}
          placeholderTextColor='gray'
        />
        <Text style={styles.errorMsg}>{errorMsg}</Text>
        <Button title='Login' onPress={handleLogin} />
      </ThemedView>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 40,
    minWidth: 360,
    maxWidth: 400,
    height: '100%',
    paddingTop: 96,
  },
  title: {
    fontSize: 36,
    fontWeight: '500',
    fontFamily: 'PocketMonk',
    textAlign: 'center',
  },
  form: {
    paddingHorizontal: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorMsg: {
    color: 'red',
    fontSize: 12,
    minHeight: 36,
    minWidth: 360,
    marginBottom: 4,
  },
})
