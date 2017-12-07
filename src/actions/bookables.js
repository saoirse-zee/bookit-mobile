import api from '../api'
import { RECEIVE_BOOKABLES } from './types'
import { handleError } from '../utils'

const receiveBookables = (locationId, json) => ({
  type: RECEIVE_BOOKABLES,
  locationId,
  bookables: json,
})

// eslint-disable-next-line import/prefer-default-export
export const fetchBookables =
  (locationId, token) => dispatch => api.fetchBookables(locationId, token)
    .then(json => dispatch(receiveBookables(locationId, json)))
    .catch(error => handleError(dispatch, error))
