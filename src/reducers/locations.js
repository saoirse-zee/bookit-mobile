import {
  REQUEST_LOCATIONS,
  RECEIVE_LOCATIONS,
  REQUEST_LOCATIONS_FAILED,
} from '../actions/types'

const initialState = {
  isFetching: false,
  items: [],
  lastUpdated: undefined,
}

const locations = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_LOCATIONS: {
      return {
        ...state,
        isFetching: true,
      }
    }
    case RECEIVE_LOCATIONS: {
      return {
        isFetching: false,
        items: action.locations,
        lastUpdated: action.receivedAt,
      }
    }
    case REQUEST_LOCATIONS_FAILED: {
      return {
        isFetching: false,
        items: [],
        lastUpdated: action.receivedAt,
      }
    }
    default: return state
  }
}

export default locations
