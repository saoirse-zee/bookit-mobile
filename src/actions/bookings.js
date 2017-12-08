import { DateTime } from 'luxon'
import api from '../api'
import { RECEIVE_BOOKINGS } from './types'
import { handleError } from '../utils'

const receiveBookings = json => ({
  type: RECEIVE_BOOKINGS,
  bookings: json,
  receivedAt: DateTime.local(),
})

// eslint-disable-next-line import/prefer-default-export
export const fetchBookings =
  token => dispatch => api.fetchBookings(token)
    .then(bookings => dispatch(receiveBookings(bookings)))
    .catch(error => handleError(dispatch, error))
