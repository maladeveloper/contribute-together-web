
import { BASE_URL, keysToCamel } from './constants'

export const fetchNumericalParams = async () => {
    const url = BASE_URL + 'numerical-params'
    const response = await fetch(url)
    return keysToCamel(await response.json())
}

