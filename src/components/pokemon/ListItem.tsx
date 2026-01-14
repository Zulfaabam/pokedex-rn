import React from 'react'
import {
  Pressable,
  PressableProps,
  StyleSheet,
  useColorScheme,
} from 'react-native'
import { ThemedText } from '../ThemedText'
import { Colors } from '@/constants/Colors'

interface ListItemProps extends PressableProps {
  onPress: () => void
  name: string
  number: string
}

function ListItem({ onPress, name, number, ...props }: ListItemProps) {
  const theme = useColorScheme() ?? 'light'

  return (
    <Pressable
      onPress={onPress}
      style={[styles.item, { backgroundColor: Colors[theme].background }]}
      {...props}
    >
      <ThemedText style={styles.text}>{number}</ThemedText>
      <ThemedText style={styles.text}>{name}</ThemedText>
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
