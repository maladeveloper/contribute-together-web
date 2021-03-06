import { BASE_URL, keysToCamel } from './constants'


export const fetchIncomeSources = async (userId) => {
  const url = BASE_URL + `income-sources/${userId}`

  const response = await fetch(url)
  return (await response.json()).map( sources => keysToCamel(sources))
}

export const fetchAveragedIncomeByInterval = async (intervalId) => {
  const url = BASE_URL + `income/averaged/${intervalId}`

  const response = await fetch(url)
  return await response.json()
}

export const fetchIncomeBySource = async (intervalId) => {
  const url = BASE_URL + `income/income-source/${intervalId}`

  const response = await fetch(url)
  return await response.json()
}

export const postNewIncome = async (incomeLoad) => {
  const url = BASE_URL + `income/`

  const response = await fetch(url, {
    method:'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(incomeLoad)
  })
  return await response
}

export const deleteSpecificIncome = async (incomeId) => {
  const url = BASE_URL + `income/` + incomeId
  const response = await fetch(url, {
    method:'DELETE',
    headers: {'Content-Type': 'application/json'},
  })
  return await response
}
  


