import { userHasLoggedIn } from '../index'

describe('User logged in indicator', () => {
  test('returns true when user has just logged in', () => {
    const props = { userExists: false }
    const nextProps = { userExists: true }
    expect(userHasLoggedIn(props, nextProps)).toBe(true)
  })

  test('returns false when user is logged out', () => {
    const props = { userExists: false }
    const nextProps = { userExists: false }
    expect(userHasLoggedIn(props, nextProps)).toBe(false)
  })

  test('returns false when user was already logged in', () => {
    const props = { userExists: true }
    const nextProps = { userExists: true }
    expect(userHasLoggedIn(props, nextProps)).toBe(false)
  })
})
