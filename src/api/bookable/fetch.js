import axios from 'axios'
import config from '../../../config.json'

const baseUrl = config.bookitApiBaseUrl

const fetchBookables = (locationId, token) => {
  if (!locationId) {
    const error = new Error('fetchBookables() needs a `locationId`')
    return Promise.reject(error)
  }
  if (!token) {
    const error = new Error('fetchBookables() needs a jwt to identify the user')
    return Promise.reject(error)
  }
  return axios.get(`${baseUrl}location/${locationId}/bookable?expand=bookings`, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(response => response.data)
}

export default fetchBookables
