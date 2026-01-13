import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native'
import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'

export default function Login() {
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
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Pokedex!</Text>
      <View style={styles.form}>
        <TextInput
          placeholder='example@email.com'
          onChangeText={setEmail}
          style={styles.input}
          placeholderTextColor='gray'
        />
        <TextInput
          placeholder='Password min 6 characters'
          secureTextEntry
          onChangeText={setPassword}
          style={styles.input}
          placeholderTextColor='gray'
        />
        <Text style={styles.errorMsg}>{errorMsg}</Text>
        <Button title='Login' onPress={handleLogin} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 40,
    minWidth: 360,
    maxWidth: 400,
    marginHorizontal: 'auto',
    paddingHorizontal: 16,
    marginVertical: 96,
  },
  title: {
    fontSize: 36,
    fontWeight: '500',
    fontFamily: 'PocketMonk',
    textAlign: 'center',
  },
  form: {
    // gap: 16,
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
