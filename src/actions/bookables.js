import api from '../api'

import { RECEIVE_BOOKABLES } from './types'

const receiveBookables = (locationId, json) => ({
  type: RECEIVE_BOOKABLES,
  locationId,
  bookables: json,
})

// eslint-disable-next-line import/prefer-default-export
export const fetchBookables =
  (locationId, token) => dispatch => api.fetchBookables(locationId, token)
    .then(json => dispatch(receiveBookables(locationId, json)))
