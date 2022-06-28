import { BASE_URL } from './constants'

export const fetchPaymentByInterval = async (intervalId) => {
  const url = BASE_URL + `payment/${intervalId}`
  const response = await fetch(url)
  return await response.json()
}