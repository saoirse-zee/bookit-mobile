import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { fetchBookables } from '../bookables'
import {
  REQUEST_BOOKABLES,
  RECEIVE_BOOKABLES,
  REQUEST_BOOKABLES_FAILED,
} from '../types'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('Bookables fetch action', () => {
  it('begins by dispatching the bookables request action', () => {
    const store = mockStore({})
    return store.dispatch(fetchBookables('LONDON-67', 'this.fake.jwt'))
      .then(() => {
        const actions = store.getActions()
        const firstAction = actions[0]

        expect(firstAction).toEqual({
          type: REQUEST_BOOKABLES,
          locationId: 'LONDON-67',
        })
      })
  })

  it('dispatches the success action on success', () => {
    const store = mockStore({})
    return store.dispatch(fetchBookables('LONDON-67', 'this.fake.jwt'))
      .then(() => {
        const actions = store.getActions()
        const secondAction = actions[1]

        expect(secondAction).toEqual({
          type: RECEIVE_BOOKABLES,
          locationId: 'LONDON-67',
          bookables: [1, 2, 3], // Mock data defined in `src/api/mocks/axios.js`
        })
      })
  })

  it('dispatches the failure action on failure', () => {
    const store = mockStore({})
    const oopsForgotToDefineLocation = undefined
    return store.dispatch(fetchBookables(oopsForgotToDefineLocation, 'this.fake.jwt'))
      .then(() => {
        const actions = store.getActions()
        const secondAction = actions[1]

        expect(secondAction).toEqual({
          type: REQUEST_BOOKABLES_FAILED,
          locationId: undefined,
        })
      })
  })
})
