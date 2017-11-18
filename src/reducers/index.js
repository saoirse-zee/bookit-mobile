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

const bookings = (state = [], action) => {
  switch (action.type) {
    case 'RECEIVE_BOOKINGS': {
      return action.bookings
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
})

export default root
