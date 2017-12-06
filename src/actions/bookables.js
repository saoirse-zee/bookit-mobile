import axios from 'axios'

import { RECEIVE_BOOKABLES } from './types'
import config from '../../config.json'

const baseUrl = config.bookitApiBaseUrl

const receiveBookables = (locationId, json) => ({
  type: RECEIVE_BOOKABLES,
  locationId,
  bookables: json,
})

// eslint-disable-next-line import/prefer-default-export
export const fetchBookables =
  locationId => dispatch => axios(`${baseUrl}location/${locationId}/bookable`, {
    headers: { Authorization: 'Bearer fake-token' },
  })
    .then(response => response.data)
    .then(json => dispatch(receiveBookables(locationId, json)))
