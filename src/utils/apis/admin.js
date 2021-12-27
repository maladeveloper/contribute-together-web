import { BASE_URL, keysToCamel } from './constants'

export const fetchAllUsers = async () => {
  const url = BASE_URL + 'users'
  const response = await fetch(url)
 return (await response.json()).map( user => keysToCamel(user))
}

export const fetchUnpaidUsers = async (intervalId) => {
  const url = BASE_URL + 'users/unpaid/' + intervalId
  const response = await fetch(url)
  return await response.json()
}
