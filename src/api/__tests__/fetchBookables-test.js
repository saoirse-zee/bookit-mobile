import fetchBookables from '../bookable/fetch'

describe('Bookables fetcher', () => {
  test('rejects if location id parameter is missing', () => {
    expect.assertions(1)
    return expect(fetchBookables(undefined, 'im.a.jwt')).rejects.toMatch('fetchBookables() needs a `locationId`')
  })

  test('rejects if token parameter is missing', () => {
    expect.assertions(1)
    return expect(fetchBookables('location3')).rejects.toMatch('fetchBookables() needs a jwt to identify the user')
  })

  test('fetches an array of bookables', () => {
    expect.assertions(1)
    return expect(fetchBookables('location1', 'im.a.jwt')).resolves.toHaveLength(3)
  })
})
