import axios from 'axios'
import config from '../../../config.json'

const baseUrl = config.bookitApiBaseUrl

const fetchBookings = (token) => {
  if (!token) {
    const error = new Error('fetchBookings() needs a jwt to identify the user')
    return Promise.reject(error)
  }
  return axios.get(`${baseUrl}booking/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(response => response.data)
}

export default fetchBookings
