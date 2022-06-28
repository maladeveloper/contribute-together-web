import { BASE_URL, keysToCamel } from './constants'

export const fetchAllUsers = async () => {
  const url = BASE_URL + 'users'
  const response = await fetch(url)
 return (await response.json()).map( user => keysToCamel(user))
}

export const fetchUnsubmittedUsers = async (intervalId) => {
  const url = BASE_URL + 'users/unsubmitted/' + intervalId
  const response = await fetch(url)
  return await response.json()
}
