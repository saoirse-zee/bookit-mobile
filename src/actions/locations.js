import api from '../api'
import {
  REQUEST_LOCATIONS,
  RECEIVE_LOCATIONS,
  REQUEST_LOCATIONS_FAILED,
} from './types'
import { handleError } from '../utils'

const requestLocations = () => ({
  type: REQUEST_LOCATIONS,
})

const receiveLocations = json => ({
  type: RECEIVE_LOCATIONS,
  locations: json,
})

const requestLocationsFailed = () => ({
  type: REQUEST_LOCATIONS_FAILED,
})

// eslint-disable-next-line import/prefer-default-export
export const fetchLocations =
  token => (dispatch) => {
    dispatch(requestLocations())
    return api.fetchLocations(token)
      .then(locations => dispatch(receiveLocations(locations)))
      .catch((error) => {
        dispatch(requestLocationsFailed())
        handleError(dispatch, error)
      })
  }
