import { combineReducers } from 'redux'

import selectedLocation from './selectedLocation'
import locations from './locations'
import bookables from './bookables'
import bookings from './bookings'
import createBooking from './createBooking'
import modal from './modal'

const root = combineReducers({
  selectedLocation,
  locations,
  bookables,
  bookings,
  createBooking,
  modal,
})

export default root
