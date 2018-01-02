import { combineReducers } from 'redux'

import selectedLocation from './selectedLocation'
import locations from './locations'
import bookablesByLocation from './bookablesByLocation'
import bookings from './bookings'
import createBooking from './createBooking'
import modal from './modal'
import token from './token'
import errors from './errors'

const root = combineReducers({
  selectedLocation,
  locations,
  bookablesByLocation,
  bookings,
  createBooking,
  modal,
  token,
  errors,
})

export default root
