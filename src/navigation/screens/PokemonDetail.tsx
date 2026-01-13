import { RouteProp, useRoute } from '@react-navigation/native'
import React from 'react'
import { Text, View } from 'react-native'
import { MainStackParamList } from '../MainStack'

export default function PokemonDetail() {
  const { params } = useRoute<RouteProp<MainStackParamList, 'PokemonDetail'>>()

  return (
    <View>
      <Text>{params.name}</Text>
    </View>
  )
}
