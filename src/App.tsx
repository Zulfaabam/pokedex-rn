import 'react-native-reanimated'
import { useFonts } from 'expo-font'
import * as React from 'react'

import RootNavigator from './navigation'
import { AuthProvider } from './context/AuthContext'

export function App() {
  const [loaded] = useFonts({
    PocketMonk: require('./assets/fonts/Pocket-Monk.otf'),
    PixelifySans: require('./assets/fonts/PixelifySans-VariableFont_wght.ttf'),
    SpaceMono: require('./assets/fonts/SpaceMono-Regular.ttf'),
  })

  if (!loaded) {
    // Async font loading only occurs in development.
    return null
  }

  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  )
}
