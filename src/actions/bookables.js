import { RECEIVE_BOOKABLES } from './types'
import config from '../../config'

const baseUrl = config.bookitApiBaseUrl

const receiveBookables = (locationId, json) => ({
  type: RECEIVE_BOOKABLES,
  locationId,
  bookables: json,
})

// eslint-disable-next-line import/prefer-default-export
export const fetchBookables =
  locationId => dispatch => fetch(`${baseUrl}location/${locationId}/bookable`)
    .then(response => response.json())
    .then(json => dispatch(receiveBookables(locationId, json)))
