import { getPokemonList } from '@/services/pokeApi'
import { PokemonList } from '@/types/pokemon'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Image } from 'expo-image'
import { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { MainStackParamList } from '../MainStack'
import { useAuth } from '@/context/AuthContext'
import ListItem from '@/components/pokemon/ListItem'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'

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
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPokemon = async (isRefresh = false) => {
    if (!isRefresh) setIsLoading(true)
    setError(null)
    try {
      const res = await getPokemonList(50, 0)
      setPokemon(res.data)
    } catch (err) {
      setError('Failed to load Pokemon list')
    } finally {
      if (!isRefresh) setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPokemon()
  }, [])

  const onRefresh = async () => {
    setRefreshing(true)
    await fetchPokemon(true)
    setRefreshing(false)
  }

  return (
    <ThemedView style={{ height: '100%' }}>
      <View style={styles.header}>
        <Image
          source={require('@/assets/images/pokeball.png')}
          style={styles.pokeball}
        />
        <View style={styles.headerText}>
          <Text style={styles.helloText}>Hello!</Text>
          <Text style={styles.emailText}>{session?.email} </Text>
        </View>
      </View>
      {isLoading ? (
        <ThemedView style={styles.centerContainer}>
          <ActivityIndicator size='large' color='#ee1515' />
        </ThemedView>
      ) : error ? (
        <ThemedView style={styles.centerContainer}>
          <ThemedText style={styles.errorText}>{error}</ThemedText>
          <Button
            title='Retry'
            onPress={() => fetchPokemon()}
            color='#ee0044'
          />
        </ThemedView>
      ) : (
        <FlatList
          data={pokemon.results}
          ListEmptyComponent={
            <ThemedView style={styles.centerContainer}>
              <ThemedText style={styles.emptyText}>No Pokemon found</ThemedText>
            </ThemedView>
          }
          keyExtractor={(item) => item?.name}
          refreshing={refreshing}
          onRefresh={onRefresh}
          style={styles.list}
          renderItem={({ item }) => {
            const number = item?.url
              .split('/')
              [item?.url.split('/').length - 2].padStart(4, '0')
            return (
              <ListItem
                key={item.name}
                onPress={() =>
                  navigation.navigate('PokemonDetail', { name: item.name })
                }
                name={item.name}
                number={number}
              />
            )
          }}
        />
      )}
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 16,
  },
  errorText: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  list: {},
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
    gap: 4,
    marginVertical: 'auto',
    paddingRight: 8,
  },
  helloText: {
    color: '#e0e0e0',
    fontFamily: 'PixelifySans',
    fontSize: 20,
    textAlign: 'right',
  },
  emailText: {
    color: '#e0e0e0',
    fontFamily: 'PixelifySans',
    fontSize: 16,
    textAlign: 'right',
  },
  pokeball: {
    height: 130,
    width: 130,
    bottom: -30,
    left: -20,
    position: 'absolute',
    transform: [{ rotate: '20deg' }],
  },
  emptyText: {
    textAlign: 'center',
    fontFamily: 'PixelifySans',
  },
})
