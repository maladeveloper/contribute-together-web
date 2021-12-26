import { BASE_URL, keysToCamel } from './constants'

export const fetchAllUsers = async () => {
  const url = BASE_URL + 'users'
  const response = await fetch(url)
 return (await response.json()).map( user => keysToCamel(user))
}
