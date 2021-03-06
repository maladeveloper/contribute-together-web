import { BASE_URL } from './constants'

export const fetchTaxByInterval = async (intervalId) => {
  const url = BASE_URL + `tax/${intervalId}`
  const response = await fetch(url)
  return await response.json()
}
