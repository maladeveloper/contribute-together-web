
import { BASE_URL, keysToCamel } from './constants'

export const fetchTotalIncomeMetric = async () => {
  const url = BASE_URL + 'metrics/total-income'
  const response = await fetch(url)
 return await response.json()
}

export const fetchTotalPaidMetric = async () => {
  const url = BASE_URL + 'metrics/total-paid'
  const response = await fetch(url)
 return await response.json()
}


export const fetchPaymentByIntervalMetric = async () => {
  const url = BASE_URL + 'metrics/total-payment-by-interval'
  const response = await fetch(url)
 return keysToCamel(await response.json())
}


export const fetchTotalIncomeByIntervalMetric = async () => {
  const url = BASE_URL + 'metrics/total-income-by-interval'
  const response = await fetch(url)
 return keysToCamel(await response.json())
}