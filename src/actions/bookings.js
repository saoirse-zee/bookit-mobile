import { DateTime } from 'luxon'
import api from '../api'
import {
  REQUEST_BOOKINGS,
  RECEIVE_BOOKINGS,
  REQUEST_BOOKINGS_FAILED,
} from './types'
import { handleError } from '../utils'

const requestBookings = () => ({
  type: REQUEST_BOOKINGS,
})

const receiveBookings = json => ({
  type: RECEIVE_BOOKINGS,
  bookings: json,
  receivedAt: DateTime.local(),
})

const requestBookingsFailed = () => ({
  type: REQUEST_BOOKINGS_FAILED,
})

// eslint-disable-next-line import/prefer-default-export
export const fetchBookings =
  token => (dispatch) => {
    requestBookings()
    api.fetchBookings(token)
      .then(bookings => dispatch(receiveBookings(bookings)))
      .catch((error) => {
        requestBookingsFailed()
        handleError(dispatch, error)
      })
  }
