
import { BASE_URL, keysToCamel } from './constants'

export const fetchNumericalParams = async () => {
    const url = BASE_URL + 'numerical-params'
    const response = await fetch(url)
    return keysToCamel(await response.json())
}

export const patchNumericalParams = async (key, value) => {
  const url = BASE_URL + `numerical-params/` 
  const response = await fetch(url, {
    method:'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({'key':key, 'value':value})
  })
  return await response
}

