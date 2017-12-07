import fetchLocations from '../location/fetch'

describe('Locations fetcher', () => {
  test('rejects if token parameter is missing', () => {
    expect.assertions(1)
    return expect(fetchLocations()).rejects.toMatch('fetchLocations() needs a jwt to identify the user')
  })

  test('fetches an array of locations', () => {
    expect.assertions(1)
    return expect(fetchLocations('im.a.jwt')).resolves.toHaveLength(3)
  })
})
