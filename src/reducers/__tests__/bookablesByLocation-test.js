import bookablesByLocation from '../bookablesByLocation'

describe('bookablesByLocation reducer', () => {
  it('should provide the initial state when app boots up', () => {
    const bootState = undefined
    const action = {}
    const nextState = bookablesByLocation(bootState, action)
    expect(nextState).toEqual({})
  })

  it('should handle REQUEST_BOOKABLES action', () => {
    const previousState = {}
    const requestBookablesForTaipeiAction = {
      type: 'REQUEST_BOOKABLES',
      locationId: 'TAIPEI_66',
    }
    const nextState = bookablesByLocation(previousState, requestBookablesForTaipeiAction)
    expect(nextState).toEqual({
      TAIPEI_66: {
        isFetching: true,
        items: [],
      },
    })
  })

  it('should handle RECEIVE_BOOKABLES action', () => {
    const previousState = {
      TAIPEI_66: {
        isFetching: true,
        items: [],
      },
    }
    const receiveBookablesForTaipeiAction = {
      type: 'RECEIVE_BOOKABLES',
      locationId: 'TAIPEI_66',
      bookables: [1, 2, 3],
    }
    const nextState = bookablesByLocation(previousState, receiveBookablesForTaipeiAction)
    expect(nextState).toEqual({
      TAIPEI_66: {
        isFetching: false,
        items: [1, 2, 3],
      },
    })
  })

  it('should handle REQUEST_BOOKABLES_FAILED', () => {
    const previousState = {
      TAIPEI_66: {
        isFetching: true,
        items: [],
      },
    }
    const receiveBookablesFailureAction = {
      type: 'REQUEST_BOOKABLES_FAILED',
      locationId: 'TAIPEI_66',
    }
    const nextState = bookablesByLocation(previousState, receiveBookablesFailureAction)
    expect(nextState).toEqual({
      TAIPEI_66: {
        isFetching: false,
        items: [],
      },
    })
  })

  it('should zap the cached bookables only for the requested location on REQUEST_BOOKABLES_FAILED', () => {
    const previousState = {
      TAIPEI_66: {
        isFetching: true,
        items: [1, 2, 3],
      },
      LONDON_33: {
        isFetching: false,
        items: [4, 5, 6],
      },
    }
    const receiveBookablesFailureAction = {
      type: 'REQUEST_BOOKABLES_FAILED',
      locationId: 'TAIPEI_66',
    }
    const nextState = bookablesByLocation(previousState, receiveBookablesFailureAction)
    expect(nextState).toEqual({
      TAIPEI_66: {
        isFetching: false,
        items: [],
      },
      LONDON_33: {
        isFetching: false,
        items: [4, 5, 6],
      },
    })
  })
})
