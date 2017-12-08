import axios from 'axios'
import config from '../../../config.json'

const baseUrl = config.bookitApiBaseUrl

const fetchLocations = (token) => {
  if (!token) {
    const error = new Error('fetchLocations() needs a jwt to identify the user')
    return Promise.reject(error)
  }
  return axios.get(`${baseUrl}location/`, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(response => response.data)
}

export default fetchLocations
