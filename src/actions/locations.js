import axios from 'axios'

import { RECEIVE_LOCATIONS } from './types'
import config from '../../config.json'

const baseUrl = config.bookitApiBaseUrl

const receiveLocations = json => ({
  type: RECEIVE_LOCATIONS,
  locations: json,
})

// eslint-disable-next-line import/prefer-default-export
export const fetchLocations =
  () => dispatch => axios(`${baseUrl}location/`, {
    headers: { Authorization: 'Bearer fake-token' },
  })
    .then(response => response.data)
    .then(json => dispatch(receiveLocations(json)))
