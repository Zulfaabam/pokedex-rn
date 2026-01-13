import { useAuth } from '@/context/AuthContext'
import { Button, StyleSheet, Text, View } from 'react-native'

export default function Other() {
  const { session, logout } = useAuth()

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{session?.email}</Text>
      <Button title='Logout' onPress={logout} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
    fontFamily: 'PixelifySans',
    color: '#333',
    marginBottom: 8,
  },
  subText: {
    fontSize: 16,
    color: '#666',
    fontFamily: 'PixelifySans',
  },
})
