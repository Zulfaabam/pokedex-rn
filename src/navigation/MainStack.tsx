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
        options={{
          title: 'Pokédex',
          headerTitleStyle: { fontFamily: 'PocketMonk', color: '#f0f0f0' },
          headerStyle: { backgroundColor: '#ee1515' },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name='PokemonDetail'
        component={PokemonDetail}
        options={{
          title: 'Pokémon Detail',
          headerTitleStyle: { fontFamily: 'PocketMonk' },
        }}
      />
      <Stack.Screen name='NotFound' component={NotFound} />
    </Stack.Navigator>
  )
}
