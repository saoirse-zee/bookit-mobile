import locations from '../locations'

describe('locations reducer', () => {
  it('should provide the initial state when app boots up', () => {
    const bootState = undefined
    const action = {}
    const nextState = locations(bootState, action)
    expect(nextState).toEqual({
      isFetching: false,
      items: [],
      lastUpdated: undefined,
    })
  })

  it('should handle REQUEST_LOCATIONS action', () => {
    const previousState = {
      isFetching: false,
      items: [],
      lastUpdated: undefined,
    }
    const requestLocationsAction = {
      type: 'REQUEST_LOCATIONS',
    }
    const nextState = locations(previousState, requestLocationsAction)
    expect(nextState).toEqual({
      isFetching: true,
      items: [],
      lastUpdated: undefined,
    })
  })

  it('should handle RECEIVE_LOCATIONS action', () => {
    const previousState = {
      isFetching: true,
      items: [],
      lastUpdated: undefined,
    }
    const receiveLocationsAction = {
      type: 'RECEIVE_LOCATIONS',
      locations: [1, 2, 3],
      receivedAt: 'lunch time',
    }
    const nextState = locations(previousState, receiveLocationsAction)
    expect(nextState).toEqual({
      isFetching: false,
      items: [1, 2, 3],
      lastUpdated: 'lunch time',
    })
  })

  it('should handle REQUEST_LOCATIONS_FAILED', () => {
    const previousState = {
      isFetching: true,
      items: [1, 2, 3],
      lastUpdated: 'lunch time',
    }
    const receiveLocationsFailureAction = {
      type: 'REQUEST_LOCATIONS_FAILED',
      receivedAt: 'dinner time',
    }
    const nextState = locations(previousState, receiveLocationsFailureAction)
    expect(nextState).toEqual({
      isFetching: false,
      items: [],
      lastUpdated: 'dinner time',
    })
  })
})
