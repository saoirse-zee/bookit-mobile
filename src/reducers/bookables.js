import {
  RECEIVE_BOOKABLES,
} from '../actions/types'

const bookables = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_BOOKABLES: {
      return action.bookables
    }
    default: return state
  }
}

export default bookables
