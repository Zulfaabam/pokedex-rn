import { Colors } from '@/constants/Colors'
import { Stat } from '@/types/pokemon'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface StatsProps {
  stat: Stat
  statName: string
  percentage: number
  typeColor: string
}

function Stats({ stat, statName, percentage, typeColor }: StatsProps) {
  return (
    <View key={stat.stat.name} style={styles.statRow}>
      <Text style={[styles.statLabel, { color: Colors.light.icon }]}>
        {statName}
      </Text>
      <Text style={[styles.statValue, { color: Colors.light.text }]}>
        {stat.base_stat.toString()}
      </Text>
      <View style={styles.progressBarBackground}>
        <View
          style={[
            styles.progressBarFill,
            { width: `${percentage}%`, backgroundColor: typeColor },
          ]}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  statLabel: {
    width: 52,
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 8,
  },
  statValue: {
    width: 30,
    fontSize: 14,
    textAlign: 'right',
    marginRight: 12,
  },
  progressBarBackground: {
    flex: 1,
    height: 6,
    backgroundColor: '#eee',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
})

export default Stats
