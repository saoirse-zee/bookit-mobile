import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { fetchBookings } from '../bookings'
import {
  REQUEST_BOOKINGS,
  RECEIVE_BOOKINGS,
  REQUEST_BOOKINGS_FAILED,
} from '../types'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('Bookings fetch action', () => {
  it('begins by dispatching the bookings request action', () => {
    const store = mockStore({})
    return store.dispatch(fetchBookings('this.fake.jwt'))
      .then(() => {
        const actions = store.getActions()
        const firstAction = actions[0]

        expect(firstAction).toEqual({
          type: REQUEST_BOOKINGS,
        })
      })
  })

  it('dispatches the success action on success', () => {
    const store = mockStore({})

    return store.dispatch(fetchBookings('this.fake.jwt'))
      .then(() => {
        const actions = store.getActions()
        const secondAction = actions[1]

        expect(secondAction.type)
          .toEqual(RECEIVE_BOOKINGS)
        expect(secondAction.bookings)
          .toEqual([1, 2, 3]) // Mock data defined in `src/api/mocks/axios.js`
        expect(secondAction.receivedAt)
          .toBeTruthy() // Surely there's a better way to test this timestamp.
      })
  })

  it('dispatches the failure action on failure', () => {
    const store = mockStore({})
    const oopsForgotJWT = undefined
    return store.dispatch(fetchBookings(oopsForgotJWT))
      .then(() => {
        const actions = store.getActions()
        const secondAction = actions[1]

        expect(secondAction).toEqual({
          type: REQUEST_BOOKINGS_FAILED,
        })
      })
  })
})
