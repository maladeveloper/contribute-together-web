import { BASE_URL, keysToCamel } from './constants'

export const fetchLatestInterval = async () => (await fetchIntervals()).shift()


export const fetchIntervals = async () => {
  const url = BASE_URL + 'intervals'
  const response = await fetch(url, {
    method:'GET',
    headers: {'Content-Type': 'application/json'},
  })
 return (await response.json()).map( interval => keysToCamel(interval))
}

