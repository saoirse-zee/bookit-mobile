import bookings from '../bookings'

describe('bookings reducer', () => {
  it('should provide the initial state when app boots up', () => {
    const bootState = undefined
    const action = {}
    const nextState = bookings(bootState, action)
    expect(nextState).toEqual({
      isFetching: false,
      items: [],
      lastUpdated: undefined,
    })
  })

  it('should handle REQUEST_BOOKINGS action', () => {
    const previousState = {
      isFetching: false,
      items: [],
      lastUpdated: undefined,
    }
    const requestBookingsAction = {
      type: 'REQUEST_BOOKINGS',
    }
    const nextState = bookings(previousState, requestBookingsAction)
    expect(nextState).toEqual({
      isFetching: true,
      items: [],
      lastUpdated: undefined,
    })
  })

  it('should handle RECEIVE_BOOKINGS action', () => {
    const previousState = {
      isFetching: true,
      items: [],
      lastUpdated: undefined,
    }
    const receiveBookingsAction = {
      type: 'RECEIVE_BOOKINGS',
      bookings: [1, 2, 3],
      receivedAt: 'lunch time',
    }
    const nextState = bookings(previousState, receiveBookingsAction)
    expect(nextState).toEqual({
      isFetching: false,
      items: [1, 2, 3],
      lastUpdated: 'lunch time',
    })
  })

  it('should handle REQUEST_BOOKINGS_FAILED', () => {
    const previousState = {
      isFetching: true,
      items: [1, 2, 3],
      lastUpdated: 'lunch time',
    }
    const receiveBookingsFailureAction = {
      type: 'REQUEST_BOOKINGS_FAILED',
      receivedAt: 'dinner time',
    }
    const nextState = bookings(previousState, receiveBookingsFailureAction)
    expect(nextState).toEqual({
      isFetching: false,
      items: [],
      lastUpdated: 'dinner time',
    })
  })
})
