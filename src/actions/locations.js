import api from '../api'
import { RECEIVE_LOCATIONS } from './types'
import { handleError } from '../utils'

const receiveLocations = json => ({
  type: RECEIVE_LOCATIONS,
  locations: json,
})

// eslint-disable-next-line import/prefer-default-export
export const fetchLocations =
  token => dispatch => api.fetchLocations(token)
    .then(locations => dispatch(receiveLocations(locations)))
    .catch(error => handleError(dispatch, error))
