import { RECEIVE_LOCATIONS } from './types'
import config from '../../config'

const baseUrl = config.bookitApiBaseUrl

const receiveLocations = json => ({
  type: RECEIVE_LOCATIONS,
  locations: json,
})

// eslint-disable-next-line import/prefer-default-export
export const fetchLocations =
  () => dispatch => fetch(`${baseUrl}location/`)
    .then(response => response.json())
    .then(json => dispatch(receiveLocations(json)))
