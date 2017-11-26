import { DateTime } from 'luxon'
import { RECEIVE_BOOKINGS } from './types'
import config from '../../config'

const baseUrl = config.bookitApiBaseUrl

const receiveBookings = json => ({
  type: RECEIVE_BOOKINGS,
  bookings: json,
  receivedAt: DateTime.local(),
})

// eslint-disable-next-line import/prefer-default-export
export const fetchBookings =
  () => dispatch => fetch(`${baseUrl}booking`)
    .then(response => response.json())
    .then(json => dispatch(receiveBookings(json)))
