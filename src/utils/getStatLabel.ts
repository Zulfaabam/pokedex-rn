export function getStatLabel(name: string) {
  switch (name) {
    case 'hp':
      return 'HP'
    case 'attack':
      return 'ATK'
    case 'defense':
      return 'DEF'
    case 'special-attack':
      return 'SP.ATK'
    case 'special-defense':
      return 'SP.DEF'
    case 'speed':
      return 'SPD'
    default:
      return name.toUpperCase()
  }
}
