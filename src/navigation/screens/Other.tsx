import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { useAuth } from '@/context/AuthContext'
import { Button, StyleSheet, Text, View } from 'react-native'

export default function Other() {
  const { session, logout } = useAuth()

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.text}>{session?.email}</ThemedText>
      <Button title='Logout' onPress={logout} />
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
    fontFamily: 'PixelifySans',
    // color: '#333',
    marginBottom: 8,
  },
})
