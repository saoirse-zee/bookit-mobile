import { isMakingNetworkRequest } from '../index'

describe('isMakingNetworkRequest', () => {
  test('returns true when any request is pending', () => {
    const reduxState = {
      bookings: { isFetching: true },
      locations: { isFetching: false },
      bookablesByLocation: {
        'LONDON-13': { isFetching: false },
        'PARIS-13': { isFetching: true },
      },
      arbitraryState: { blurg: 'smurg' },
    }
    expect(isMakingNetworkRequest(reduxState)).toBe(true)
  })

  test('returns false when all requests are idle', () => {
    const reduxState = {
      bookings: { isFetching: false },
      locations: { isFetching: false },
      bookablesByLocation: {
        'LONDON-13': { isFetching: false },
        'PARIS-13': { isFetching: false },
      },
      arbitraryState: { blurg: 'smurg' },
    }
    expect(isMakingNetworkRequest(reduxState)).toBe(false)
  })

  test('throws a meaningful error when state is invalid', () => {
    const reduxState = {
      notBookings: { isFetching: false },
      locations: { isFetching: false },
      bookablesByLocation: {
        'LONDON-13': { isFetching: false },
        'PARIS-13': { isFetching: true },
      },
    }
    const error = new Error('The params supplied to isMakingNetworkRequest is invalid. Make sure Redux state includes bookings, locations, and bookablesByLocation.')
    function tryToGetNetworkActivityStatus() {
      isMakingNetworkRequest(reduxState)
    }
    expect(tryToGetNetworkActivityStatus).toThrow(error)
  })
})
