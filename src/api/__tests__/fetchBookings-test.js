import fetchBookings from '../booking/fetch'

describe('Bookings fetcher', () => {
  test('rejects if token parameter is missing', () => {
    expect.assertions(1)
    return expect(fetchBookings()).rejects.toMatch('fetchBookings() needs a jwt to identify the user')
  })

  test('fetches an array of bookings', () => {
    expect.assertions(1)
    return expect(fetchBookings('im.a.jwt')).resolves.toHaveLength(3)
  })
})
