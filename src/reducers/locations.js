import {
  RECEIVE_LOCATIONS,
} from '../actions/types'

const locations = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_LOCATIONS: {
      return action.locations
    }
    default: return state
  }
}

export default locations
