import {
  REQUEST_BOOKINGS,
  RECEIVE_BOOKINGS,
  REQUEST_BOOKINGS_FAILED,
} from '../actions/types'

const initialState = {
  isFetching: false,
  items: [],
  lastUpdated: undefined,
}

const bookings = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_BOOKINGS: {
      return {
        ...state,
        isFetching: true,
      }
    }
    case RECEIVE_BOOKINGS: {
      return {
        ...state,
        isFetching: false,
        items: action.bookings,
        lastUpdated: action.receivedAt,
      }
    }
    case REQUEST_BOOKINGS_FAILED: {
      return {
        isFetching: false,
        items: [],
        lastUpdated: action.receivedAt,
      }
    }
    default: return state
  }
}

export default bookings
