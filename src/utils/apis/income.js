import { BASE_URL, keysToCamel } from './constants'


export const fetchIncomeSources = async (userId) => {
  const url = BASE_URL + `income-sources/${userId}`

  const response = await fetch(url, {
    method:'GET',
    headers: {'Content-Type': 'application/json'},
  })
  return (await response.json()).map( sources => keysToCamel(sources))
}
