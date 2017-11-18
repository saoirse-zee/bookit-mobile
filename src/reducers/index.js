import { combineReducers } from 'redux'

const hi = (hiMessage = 'Hi from Redux.') => hiMessage

const hardcodedLocation = {
  id: 'b1177996-75e2-41da-a3e9-fcdd75d1ab31',
  name: 'NYC',
  timeZone: 'America/New_York',
}

const location = (state = hardcodedLocation) => state

const locations = (state = [], action) => {
  switch (action.type) {
    case 'RECEIVE_LOCATIONS': {
      return action.locations
    }
    default: return state
  }
}

const bookables = (state = [], action) => {
  switch (action.type) {
    case 'RECEIVE_BOOKABLES': {
      return action.bookables
    }
    default: return state
  }
}

const bookings = (state = {
  items: [],
  lastUpdated: null,
}, action) => {
  switch (action.type) {
    case 'RECEIVE_BOOKINGS': {
      return {
        ...state,
        items: action.bookings,
        lastUpdated: action.receivedAt,
      }
    }
    default: return state
  }
}

// Track the status of the user's attempt to create a booking
const createBookingStatus = (state = {
  bookingSucceeded: null,
  reason: '',
  newBooking: {},
}, action) => {
  switch (action.type) {
    case 'BOOKING_SUCCESS': {
      // console.log(action)
      return {
        bookingSucceeded: true,
        newBooking: action.newBooking,
        reason: '',
      }
    }
    case 'BOOKING_FAIL': {
      // console.log(action)
      return {
        bookingSucceeded: false,
        reason: action.reason,
        newBooking: {},
      }
    }
    default: return state
  }
}

const root = combineReducers({
  hi,
  location,
  locations,
  bookables,
  bookings,
  createBookingStatus,
})

export default root
