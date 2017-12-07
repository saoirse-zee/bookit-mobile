import axios from 'axios'
import config from '../../../config.json'

const baseUrl = config.bookitApiBaseUrl

const fetchBookables = (locationId, token) => {
  if (!locationId) {
    return Promise.reject('fetchBookables() needs a `locationId`')
  }
  if (!token) {
    return Promise.reject('fetchBookables() needs a jwt to identify the user')
  }
  return axios.get(`${baseUrl}location/${locationId}/bookable`, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(response => response.data)
}

export default fetchBookables
