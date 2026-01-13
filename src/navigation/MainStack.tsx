import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '@/navigation/screens/Home'
import PokemonDetail from '@/navigation/screens/PokemonDetail'
import { NotFound } from '@/navigation/screens/NotFound'
import Other from '@/navigation/screens/Other'
import { Image } from 'react-native'
import Entypo from '@expo/vector-icons/Entypo'

export type MainStackParamList = {
  Home: undefined
  PokemonDetail: { name: string }
  NotFound: undefined
}

const Stack = createNativeStackNavigator<MainStackParamList>()
const Tab = createBottomTabNavigator()

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#ee1515' },
        headerTitleStyle: { fontFamily: 'PocketMonk', color: '#f0f0f0' },
        headerTintColor: '#f0f0f0',
        tabBarStyle: {
          backgroundColor: '#ee1515',
          borderTopColor: '#cc0000',
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#ffcccc',
      }}
    >
      <Tab.Screen
        name='Pokedex'
        component={Home}
        options={{
          title: 'Pokédex',
          headerTitleStyle: { fontFamily: 'PocketMonk', color: '#f0f0f0' },
          headerStyle: { backgroundColor: '#ee1515' },
          headerShadowVisible: false,
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('@/assets/images/pokeball.png')}
              style={{ width: size, height: size }}
            />
          ),
        }}
      />
      <Tab.Screen
        name='Other'
        component={Other}
        options={{
          headerTitleStyle: { fontFamily: 'PocketMonk', color: '#f0f0f0' },
          headerStyle: { backgroundColor: '#ee1515' },
          headerShadowVisible: false,
          tabBarIcon: ({ color, size }) => (
            <Entypo name='dots-three-horizontal' size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Home'
        component={HomeTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='PokemonDetail'
        component={PokemonDetail}
        options={{
          title: 'Pokémon Detail',
          headerTitleStyle: { fontFamily: 'PocketMonk', color: '#f0f0f0' },
          headerStyle: { backgroundColor: '#ee1515' },
          headerShadowVisible: false,
          headerTintColor: '#f0f0f0',
        }}
      />
      <Stack.Screen name='NotFound' component={NotFound} />
    </Stack.Navigator>
  )
}
