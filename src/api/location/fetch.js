import axios from 'axios'
import config from '../../../config.json'

const baseUrl = config.bookitApiBaseUrl

const fetchLocations = (token) => {
  if (!token) {
    return Promise.reject('fetchLocations() needs a jwt to identify the user')
  }
  return axios.get(`${baseUrl}location/`, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(response => response.data)
}

export default fetchLocations
