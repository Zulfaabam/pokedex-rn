import { Text, Button } from '@react-navigation/elements'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StyleSheet, View } from 'react-native'
import { MainStackParamList } from '../MainStack'

type NavProp = NativeStackNavigationProp<MainStackParamList, 'NotFound'>

export function NotFound() {
  const navigation = useNavigation<NavProp>()

  return (
    <View style={styles.container}>
      <Text>404</Text>
      <Button onPress={() => navigation.navigate('Home')}>Go to Home</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
})
