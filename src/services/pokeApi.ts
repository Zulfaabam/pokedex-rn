import axios from 'axios'

const BASE_URL = 'https://pokeapi.co/api/v2'

export async function getPokemonList(limit = 20, offset = 0) {
  let data, error

  try {
    const res = await axios.get(
      `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
    )
    data = res.data
  } catch (e) {
    error = e
  }

  return { data, error }
}

export async function getPokemonDetail(name: string) {
  let data, error

  try {
    const res = await axios.get(`${BASE_URL}/pokemon/${name}`)
    data = res.data
  } catch (e) {
    error = e
  }

  return { data, error }
}
