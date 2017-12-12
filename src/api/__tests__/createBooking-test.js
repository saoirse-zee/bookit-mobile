import moment from 'moment'
import 'moment-timezone'
import createBooking from '../booking/create'

describe('Booking creator', () => {
  test('rejects if token parameter is missing', () => {
    const formData = {
      selectedBookableId: '123',
      start: moment().add(15, 'minutes').tz('America/Denver'),
      bookingDuration: 10,
    }
    expect.assertions(1)
    const expectedError = new Error('createBooking() needs a jwt to identify the user')
    return expect(createBooking(formData)).rejects.toEqual(expectedError)
  })

  test('rejects if booking data is missing', () => {
    expect.assertions(1)
    const expectedError = new Error('createBooking() needs booking data')
    return expect(createBooking(undefined, 'im.a.jwt')).rejects.toEqual(expectedError)
  })

  test('rejects if no bookable is specified', () => {
    const formData = {
      selectedBookableId: undefined,
      start: moment().add(15, 'minutes').tz('America/Denver'),
      bookingDuration: 10,
    }
    expect.assertions(1)
    const expectedError = new Error('Please select something to book.')
    return expect(createBooking(formData, 'im.a.jwt')).rejects.toEqual(expectedError)
  })

  test('resolves with the response "data" field on success', () => {
    const formData = {
      selectedBookableId: '123',
      start: moment().add(15, 'minutes').tz('America/Denver'),
      bookingDuration: 10,
    }
    const expectedResponse = { whatever: 'data the server responds with' }
    expect.assertions(1)
    return expect(createBooking(formData, 'im.a.jwt')).resolves.toEqual(expectedResponse)
  })
})
