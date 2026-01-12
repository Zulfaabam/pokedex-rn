import { getPokemonList } from '@/services/pokeApi'
import { PokemonList } from '@/types/pokemon'
import { Image } from 'expo-image'
import { useEffect, useState } from 'react'
import { FlatList, Pressable, StyleSheet, Text } from 'react-native'

export default function Home() {
  const [pokemon, setPokemon] = useState<PokemonList>({
    count: 0,
    next: '',
    previous: '',
    results: [],
  })

  useEffect(() => {
    getPokemonList(50, 0)
      .then((res) => {
        console.log(res.data)
        setPokemon(res.data)
      })
      .catch((err) => console.error(err))
  }, [])

  return (
    <FlatList
      data={pokemon.results}
      keyExtractor={(item) => item?.name}
      style={styles.list}
      renderItem={({ item }) => {
        const number = item?.url
          .split('/')
          [item?.url.split('/').length - 2].padStart(4, '0')
        return (
          <Pressable
            // onPress={() =>
            //   navigation.navigate('PokemonDetail', { name: item.name })
            // }
            style={styles.item}
          >
            <Text style={styles.text}>{number}</Text>
            <Text style={styles.text}>{item?.name}</Text>
          </Pressable>
        )
      }}
    />
  )
}

const styles = StyleSheet.create({
  list: {},
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
  },
})
