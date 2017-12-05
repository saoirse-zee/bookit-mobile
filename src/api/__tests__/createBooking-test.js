import { DateTime, Duration } from 'luxon'
import createBooking from '../booking/create'

describe('Booking creator', () => {
  test('rejects if token parameter is missing', () => {
    const formData = {
      selectedBookableId: '123',
      start: DateTime.local().plus({ minutes: 15 }).setZone('America/Denver'),
      bookingDuration: Duration.fromObject({ minutes: 10 }),
    }
    expect.assertions(1)
    return expect(createBooking(formData)).rejects.toMatch('createBooking() needs a jwt to identify the user')
  })

  test('rejects if booking data is missing', () => {
    expect.assertions(1)
    return expect(createBooking(undefined, 'im.a.jwt')).rejects.toMatch('createBooking() needs booking data')
  })

  test('rejects if no bookable is specified', () => {
    const formData = {
      selectedBookableId: undefined,
      start: DateTime.local().plus({ minutes: 15 }).setZone('America/Denver'),
      bookingDuration: Duration.fromObject({ minutes: 10 }),
    }
    expect.assertions(1)
    return expect(createBooking(formData, 'im.a.jwt')).rejects.toMatch('Please select something to book.')
  })

  test('resolves with the response "data" field on success', () => {
    const formData = {
      selectedBookableId: '123',
      start: DateTime.local().plus({ minutes: 15 }).setZone('America/Denver'),
      bookingDuration: Duration.fromObject({ minutes: 10 }),
    }
    const expectedResponse = { whatever: 'data the server responds with' }
    expect.assertions(1)
    return expect(createBooking(formData, 'im.a.jwt')).resolves.toEqual(expectedResponse)
  })
})
