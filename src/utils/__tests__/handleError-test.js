import { handleError } from '../index'

const mockDispatch = jest.fn()
const error = new Error('Oh no!')

describe.only('Error handler', () => {
  beforeAll(() => {
    handleError(mockDispatch, error)
  })

  test('dispatches two actions', () => {
    expect(mockDispatch.mock.calls.length).toBe(2)
  })

  test('dispatches the given error', () => {
    const firstArgOfFirstCall = mockDispatch.mock.calls[0][0]
    expect(firstArgOfFirstCall.error).toEqual(error)
  })

  test('dispatches the action type we use for general errors', () => {
    const firstArgOfFirstCall = mockDispatch.mock.calls[0][0]
    expect(firstArgOfFirstCall.type).toEqual('SET_ERROR')
  })

  test('dispatches the action that shows the user a modal', () => {
    const firstArgOfSecondCall = mockDispatch.mock.calls[1][0]
    expect(firstArgOfSecondCall.type).toEqual('SHOW_MODAL')
  })
})
