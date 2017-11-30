import { combineReducers } from 'redux'

import selectedLocation from './selectedLocation'
import locations from './locations'
import bookables from './bookables'
import bookings from './bookings'
import createBooking from './createBooking'
import modal from './modal'
import user from './user'

const root = combineReducers({
  selectedLocation,
  locations,
  bookables,
  bookings,
  createBooking,
  modal,
  user,
})

export default root
