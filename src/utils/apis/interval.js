import { BASE_URL, keysToCamel } from './constants'

export const fetchLatestInterval = async () => (await fetchIntervals()).shift()

export const patchIntervalAmount = async (intervalId, newAmount) => {
  const url = BASE_URL + `interval/${intervalId}/amount/` 
  const response = await fetch(url, {
    method:'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({'amount': newAmount})
  })
  return await response
}

export const fetchIntervals = async () => {
  const url = BASE_URL + 'intervals'
  const response = await fetch(url)
 return (await response.json()).map( interval => keysToCamel(interval))
}

