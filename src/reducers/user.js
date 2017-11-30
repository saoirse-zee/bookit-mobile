import { SET_USER, REMOVE_USER } from '../actions/types'

const initialState = {
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER: {
      return action.user
    }
    case REMOVE_USER: {
      return initialState
    }
    default: {
      return state
    }
  }
}

export default user
