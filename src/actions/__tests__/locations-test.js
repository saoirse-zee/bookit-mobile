import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { fetchLocations } from '../locations'
import {
  REQUEST_LOCATIONS,
  RECEIVE_LOCATIONS,
  REQUEST_LOCATIONS_FAILED,
} from '../types'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('Locations fetch action', () => {
  it('begins by dispatching the locations request action', () => {
    const store = mockStore({})
    return store.dispatch(fetchLocations('this.fake.jwt'))
      .then(() => {
        const actions = store.getActions()
        const firstAction = actions[0]

        expect(firstAction).toEqual({
          type: REQUEST_LOCATIONS,
        })
      })
  })

  it('dispatches the success action on success', () => {
    const store = mockStore({})

    return store.dispatch(fetchLocations('this.fake.jwt'))
      .then(() => {
        const actions = store.getActions()
        const secondAction = actions[1]

        expect(secondAction).toEqual({
          type: RECEIVE_LOCATIONS,
          locations: [1, 2, 3], // Mock data defined in `src/api/mocks/axios.js`
        })
      })
  })

  it('dispatches the failure action on failure', () => {
    const store = mockStore({})
    const oopsForgotJWT = undefined
    return store.dispatch(fetchLocations(oopsForgotJWT))
      .then(() => {
        const actions = store.getActions()
        const secondAction = actions[1]

        expect(secondAction).toEqual({
          type: REQUEST_LOCATIONS_FAILED,
        })
      })
  })
})
