import React from 'react'
import { Pressable, PressableProps, StyleSheet, Text } from 'react-native'

interface ListItemProps extends PressableProps {
  onPress: () => void
  name: string
  number: string
}

function ListItem({ onPress, name, number, ...props }: ListItemProps) {
  return (
    <Pressable onPress={onPress} style={styles.item} {...props}>
      <Text style={styles.text}>{number}</Text>
      <Text style={styles.text}>{name}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
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
})

export default ListItem
