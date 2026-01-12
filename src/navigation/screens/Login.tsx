import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native'
import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    const ok = await login(email, password)
    if (!ok) Alert.alert('Invalid credentials')
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
        <Button title='Login' onPress={handleLogin} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 24,
    minWidth: 360,
    maxWidth: 400,
    marginHorizontal: 'auto',
    paddingHorizontal: 16,
    marginVertical: 64,
  },
  title: {
    fontSize: 36,
    fontWeight: '500',
  },
  form: {
    gap: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
})
