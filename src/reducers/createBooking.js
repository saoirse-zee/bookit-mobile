// Track user's attempt to create a booking

import {
  BOOKING_SUCCESS,
  BOOKING_FAIL,
} from '../actions/types'

const initialState = {
  bookingSucceeded: null,
  reason: '',
  newBooking: {},
}

const createBooking = (state = initialState, action) => {
  switch (action.type) {
    case BOOKING_SUCCESS: {
      return {
        bookingSucceeded: true,
        newBooking: action.newBooking,
        reason: '',
      }
    }
    case BOOKING_FAIL: {
      return {
        bookingSucceeded: false,
        newBooking: {},
        reason: action.reason,
      }
    }
    default: return state
  }
}

export default createBooking
