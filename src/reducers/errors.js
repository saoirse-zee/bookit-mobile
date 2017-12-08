import { SET_ERROR, REMOVE_ERROR } from '../actions/types'

const initialState = {}

const errors = (state = initialState, action) => {
  switch (action.type) {
    case SET_ERROR: {
      return action.error
    }
    case REMOVE_ERROR: {
      return initialState
    }
    default: {
      return state
    }
  }
}

export default errors
