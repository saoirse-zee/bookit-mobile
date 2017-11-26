import {
  RECEIVE_BOOKINGS,
} from '../actions/types'

const initialState = {
  items: [],
  lastUpdated: null,
}

const bookings = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_BOOKINGS: {
      return {
        ...state,
        items: action.bookings,
        lastUpdated: action.receivedAt,
      }
    }
    default: return state
  }
}

export default bookings
