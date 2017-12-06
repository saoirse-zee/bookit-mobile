import axios from 'axios'
import { DateTime } from 'luxon'
import { RECEIVE_BOOKINGS } from './types'
import config from '../../config.json'

const baseUrl = config.bookitApiBaseUrl

const receiveBookings = json => ({
  type: RECEIVE_BOOKINGS,
  bookings: json,
  receivedAt: DateTime.local(),
})

// eslint-disable-next-line import/prefer-default-export
export const fetchBookings =
() => dispatch => axios(`${baseUrl}booking`, {
  headers: { Authorization: 'Bearer fake-token' },
})
  .then(response => response.data)
  .then(json => dispatch(receiveBookings(json)))
