import { getPokemonList } from '@/services/pokeApi'
import { PokemonList } from '@/types/pokemon'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Image } from 'expo-image'
import { useEffect, useState } from 'react'
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import { MainStackParamList } from '../MainStack'
import { useAuth } from '@/context/AuthContext'

type NavProp = NativeStackNavigationProp<MainStackParamList, 'Home'>

export default function Home() {
  const navigation = useNavigation<NavProp>()

  const { session } = useAuth()

  const [pokemon, setPokemon] = useState<PokemonList>({
    count: 0,
    next: '',
    previous: '',
    results: [],
  })
  const [refreshing, setRefreshing] = useState(false)

  const fetchPokemon = async () => {
    try {
      const res = await getPokemonList(50, 0)
      setPokemon(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchPokemon()
  }, [])

  const onRefresh = async () => {
    setRefreshing(true)
    await fetchPokemon()
    setRefreshing(false)
  }

  return (
    <View>
      <View style={styles.header}>
        <Image
          source={require('@/assets/images/pokeball.png')}
          style={styles.pokeball}
        />
        <View style={styles.headerText}>
          <Text style={styles.helloText}>Hello! {session?.email} </Text>
        </View>
      </View>
      <FlatList
        data={pokemon.results}
        refreshing={refreshing}
        onRefresh={onRefresh}
        keyExtractor={(item) => item?.name}
        style={styles.list}
        renderItem={({ item }) => {
          const number = item?.url
            .split('/')
            [item?.url.split('/').length - 2].padStart(4, '0')
          return (
            <Pressable
              onPress={() =>
                navigation.navigate('PokemonDetail', { name: item.name })
              }
              style={styles.item}
            >
              <Text style={styles.text}>{number}</Text>
              <Text style={styles.text}>{item?.name}</Text>
            </Pressable>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  list: { marginBottom: 150 },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  text: {
    textTransform: 'capitalize',
    fontFamily: 'PixelifySans',
  },
  header: {
    position: 'relative',
    height: 100,
    width: '100%',
    overflow: 'hidden',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#ee1515',
  },
  headerText: {
    marginLeft: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginVertical: 'auto',
    paddingRight: 8,
  },
  helloText: {
    color: '#e0e0e0',
    fontFamily: 'PixelifySans',
    fontSize: 18,
  },
  pokeball: {
    height: 130,
    width: 130,
    bottom: -30,
    left: -20,
    position: 'absolute',
    transform: [{ rotate: '20deg' }],
  },
})
