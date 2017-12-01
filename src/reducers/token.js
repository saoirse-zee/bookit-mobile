import { SET_TOKEN, REMOVE_TOKEN } from '../actions/types'

const initialState = ''

const token = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN: {
      return action.token
    }
    case REMOVE_TOKEN: {
      return initialState
    }
    default: {
      return state
    }
  }
}

export default token
