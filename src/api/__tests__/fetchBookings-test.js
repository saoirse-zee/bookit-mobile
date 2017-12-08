import fetchBookings from '../booking/fetch'

describe('Bookings fetcher', () => {
  test('rejects if token parameter is missing', () => {
    expect.assertions(1)
    const expectedError = new Error('fetchBookings() needs a jwt to identify the user')
    return expect(fetchBookings()).rejects.toEqual(expectedError)
  })

  test('fetches an array of bookings', () => {
    expect.assertions(1)
    return expect(fetchBookings('im.a.jwt')).resolves.toHaveLength(3)
  })
})
