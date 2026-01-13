import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { MainStackParamList } from '../MainStack'
import { getPokemonDetail } from '@/services/pokeApi'
import { TPokemonDetail } from '@/types/pokemon'
import { Ionicons } from '@expo/vector-icons'
import { Colors, TYPE_COLORS } from '@/constants/Colors'
import Stats from '@/components/pokemon/Stats'
import { getStatLabel } from '@/utils/getStatLabel'

export default function PokemonDetail() {
  const { params } = useRoute<RouteProp<MainStackParamList, 'PokemonDetail'>>()
  const navigation = useNavigation()

  const [data, setData] = useState<TPokemonDetail>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPokemonDetail(params.name)
      .then((res) => {
        setData(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
      })
  }, [params.name])

  useEffect(() => {
    if (data) {
      const mainType = data.types[0].type.name
      const backgroundColor = TYPE_COLORS[mainType] || TYPE_COLORS.normal

      navigation.setOptions({
        headerStyle: { backgroundColor },
        headerTitle: data.name,
        headerShadowVisible: false,
        headerTintColor: '#fff',
      })
    }
  }, [data, navigation])

  if (loading || !data) {
    return (
      <View
        style={[
          styles.loadingContainer,
          { backgroundColor: Colors.light.background },
        ]}
      >
        <ActivityIndicator size='large' color={Colors.light.tint} />
      </View>
    )
  }

  const mainType = data.types[0].type.name
  const backgroundColor = TYPE_COLORS[mainType] || TYPE_COLORS.normal

  return (
    <ScrollView style={[styles.container, { backgroundColor }]} bounces={false}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.id}>#{data.id.toString().padStart(4, '0')}</Text>
        </View>
        <View style={styles.typesContainer}>
          {data.types.map((t) => (
            <View
              key={t.type.name}
              style={[
                styles.typeChip,
                {
                  backgroundColor:
                    TYPE_COLORS[t.type.name] || TYPE_COLORS.normal,
                },
              ]}
            >
              <Text style={styles.typeText}>{t.type.name}</Text>
            </View>
          ))}
        </View>
        <Image
          source={{
            uri:
              data.sprites.other['official-artwork'].front_default ||
              data.sprites.front_default,
          }}
          style={styles.image}
        />
      </View>

      <View style={[styles.body, { backgroundColor: Colors.light.background }]}>
        {/* About Section */}
        <Text style={[styles.sectionTitle, { color: backgroundColor }]}>
          About
        </Text>

        <View style={styles.row}>
          <View style={styles.infoItem}>
            <View style={styles.infoRow}>
              <Ionicons
                name='scale-outline'
                size={20}
                color={Colors.light.icon}
              />
              <Text style={[styles.infoValue, { color: Colors.light.text }]}>
                {data.weight / 10} kg
              </Text>
            </View>
            <Text style={styles.infoLabel}>Weight</Text>
          </View>

          <View
            style={[styles.divider, { backgroundColor: Colors.light.icon }]}
          />

          <View style={styles.infoItem}>
            <View style={styles.infoRow}>
              <Ionicons
                name='resize-outline'
                size={20}
                color={Colors.light.icon}
              />
              <Text style={[styles.infoValue, { color: Colors.light.text }]}>
                {data.height / 10} m
              </Text>
            </View>
            <Text style={styles.infoLabel}>Height</Text>
          </View>

          <View
            style={[styles.divider, { backgroundColor: Colors.light.icon }]}
          />

          <View style={styles.infoItem}>
            <View style={styles.abilitiesContainer}>
              {data.abilities.map((a, index) => (
                <Text
                  key={index}
                  style={[
                    styles.infoValue,
                    { color: Colors.light.text, fontSize: 12 },
                  ]}
                >
                  {a.ability.name}
                </Text>
              ))}
            </View>
            <Text style={styles.infoLabel}>Abilities</Text>
          </View>
        </View>

        {/* Base Stats Section */}
        <Text style={[styles.sectionTitle, { color: backgroundColor }]}>
          Base Stats
        </Text>

        {data.stats.map((stat) => {
          const statName = getStatLabel(stat.stat.name)
          const percentage = (stat.base_stat / 255) * 100

          return (
            <Stats
              key={stat.stat.name}
              stat={stat}
              statName={statName}
              percentage={percentage}
              typeColor={backgroundColor}
            />
          )
        })}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    zIndex: 1,
    alignItems: 'center',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
    alignItems: 'center',
  },
  name: {
    fontSize: 32,
    color: 'white',
    fontFamily: 'PixelifySans',
    textTransform: 'capitalize',
  },
  id: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'PixelifySans',
  },
  typesContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  typeChip: {
    borderColor: '#f0f0f0',
    borderWidth: 0.5,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginRight: 8,
  },
  typeText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  image: {
    width: 250,
    height: 250,
    marginTop: 10,
    marginBottom: -40, // overlap with body
    zIndex: 2,
  },
  body: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 60, // space for image overlap
    paddingBottom: 40,
    minHeight: 500,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 24,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoItem: {
    alignItems: 'center',
    flex: 1,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  abilitiesContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  infoLabel: {
    fontSize: 12,
    color: '#999',
  },
  divider: {
    width: 1,
    height: '100%',
    opacity: 0.2,
  },
})
