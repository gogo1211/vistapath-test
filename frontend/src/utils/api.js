import axios from 'axios'

import { BASE_URL } from './constants'

export async function fetchCases() {
  const response = await axios.get(`${BASE_URL}/cases`)
  return response.data
}

export async function createCase(data, files) {
  const formData = new FormData()
  formData.append('data', JSON.stringify(data))
  files.forEach(({ file, annotation }) => {
    formData.append('images', file)
    formData.append('annotations', annotation)
  })
  const response = await axios.post(`${BASE_URL}/cases`, formData)
  return response.data
}

export async function updateCase(id, data, files) {
  const formData = new FormData()
  formData.append('data', JSON.stringify(data))
  files.forEach(({ file, annotation }) => {
    formData.append('new-images', file)
    formData.append('annotations', annotation)
  })
  const response = await axios.put(`${BASE_URL}/cases/${id}`, formData)
  return response.data
}
