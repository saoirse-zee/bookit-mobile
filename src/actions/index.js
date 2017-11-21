import { DateTime } from 'luxon'
import { postBooking } from '../api'
import config from '../../config'

const baseUrl = config.bookitApiBaseUrl

const receiveLocations = json => ({
  type: 'RECEIVE_LOCATIONS',
  locations: json,
})

const receiveBookables = (locationId, json) => ({
  type: 'RECEIVE_BOOKABLES',
  locationId,
  bookables: json,
})

const receiveBookings = json => ({
  type: 'RECEIVE_BOOKINGS',
  bookings: json,
  receivedAt: DateTime.local(),
})

const bookingSuccess = json => ({
  type: 'BOOKING_SUCCESS',
  newBooking: json,
})

const bookingFail = reason => ({
  type: 'BOOKING_FAIL',
  reason,
})

export const fetchLocations =
  () => dispatch => fetch(`${baseUrl}location/`)
    .then(response => response.json())
    .then(json => dispatch(receiveLocations(json)))

export const fetchBookables =
  locationId => dispatch => fetch(`${baseUrl}location/${locationId}/bookable`)
    .then(response => response.json())
    .then(json => dispatch(receiveBookables(locationId, json)))

export const fetchBookings =
  () => dispatch => fetch(`${baseUrl}booking`)
    .then(response => response.json())
    .then(json => dispatch(receiveBookings(json)))

export const createBooking = booking => dispatch => postBooking(booking)
  .then((newBooking) => {
    dispatch(bookingSuccess(newBooking))
    dispatch(fetchBookings())
  })
  .catch((error) => {
    dispatch(bookingFail(error.message))
  })
