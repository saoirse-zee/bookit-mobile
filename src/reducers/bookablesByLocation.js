import {
  REQUEST_BOOKABLES,
  RECEIVE_BOOKABLES,
  REQUEST_BOOKABLES_FAILED,
} from '../actions/types'

const initialState = {
  isFetching: false,
  items: [],
}

const bookables = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_BOOKABLES: {
      return {
        ...state,
        isFetching: true,
      }
    }
    case RECEIVE_BOOKABLES: {
      return {
        isFetching: false,
        items: action.bookables,
      }
    }
    default: return state
  }
}

const bookablesByLocation = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_BOOKABLES:
    case REQUEST_BOOKABLES: {
      return {
        ...state,
        [action.locationId]: bookables(state[action.locationId], action),
      }
    }
    case REQUEST_BOOKABLES_FAILED: {
      return {
        ...state,
        [action.locationId]: { isFetching: false, items: [] },
      }
    }
    default: return state
  }
}

export default bookablesByLocation
