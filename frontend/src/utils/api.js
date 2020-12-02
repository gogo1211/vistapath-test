import axios from 'axios'

import { BASE_URL } from './constants'

export async function fetchCases() {
  const response = await axios.get(`${BASE_URL}/cases`)
  return response.data
}

export async function createCase(data) {
  const response = await axios.post(`${BASE_URL}/cases`, data)
  return response.data
}
