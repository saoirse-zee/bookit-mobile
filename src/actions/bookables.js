import api from '../api'
import {
  REQUEST_BOOKABLES,
  RECEIVE_BOOKABLES,
  REQUEST_BOOKABLES_FAILED,
} from './types'
import { handleError } from '../utils'

const requestBookables = locationId => ({
  type: REQUEST_BOOKABLES,
  locationId,
})

const receiveBookables = (locationId, json) => ({
  type: RECEIVE_BOOKABLES,
  locationId,
  bookables: json,
})

const requestBookablesFailed = locationId => ({
  type: REQUEST_BOOKABLES_FAILED,
  locationId,
})

// eslint-disable-next-line import/prefer-default-export
export const fetchBookables =
  (locationId, token) => (dispatch) => {
    dispatch(requestBookables(locationId))

    api.fetchBookables(locationId, token)
      .then(json => dispatch(receiveBookables(locationId, json)))
      .catch((error) => {
        dispatch(requestBookablesFailed())
        handleError(dispatch, error)
      })
  }
