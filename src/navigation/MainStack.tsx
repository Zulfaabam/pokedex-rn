import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '@/navigation/screens/Home'
import PokemonDetail from '@/navigation/screens/PokemonDetail'
import { NotFound } from '@/navigation/screens/NotFound'

export type MainStackParamList = {
  Home: undefined
  PokemonDetail: { name: string }
  NotFound: undefined
}

const Stack = createNativeStackNavigator<MainStackParamList>()

export default function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Home'
        component={Home}
        options={{ title: 'Pokédex' }}
      />
      <Stack.Screen
        name='PokemonDetail'
        component={PokemonDetail}
        options={{ title: 'Pokémon Detail' }}
      />
      <Stack.Screen name='NotFound' component={NotFound} />
    </Stack.Navigator>
  )
}
