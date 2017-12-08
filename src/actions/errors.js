import { SET_ERROR, REMOVE_ERROR } from './types'

export const setError = error => ({
  type: SET_ERROR,
  error,
})

export const removeError = () => ({
  type: REMOVE_ERROR,
})
