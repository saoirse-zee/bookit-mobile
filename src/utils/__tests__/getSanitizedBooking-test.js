import { getSanitizedBooking } from '../index'

let rawBooking

describe('Booking sanitizer', () => {
  beforeEach(() => {
    rawBooking = {
      id: 'BOOKING-99',
      bookable: {
        name: 'Bottle Rocket Launcher',
        location: {
          name: 'Lala Land',
          timeZone: 'America/Los_Angeles',
        },
      },
      user: {
        name: 'Pinkey Jumpysnaps',
      },
      start: '2017-11-17T11:30',
      end: '2017-11-17T12:30',
    }
  })

  test('It should sanitize the booking', () => {
    // The time formatter is indeterminate, so not testing start & end here.
    // Not great, but better to test some than nothing.
    expect(getSanitizedBooking(rawBooking).id).toBe('BOOKING-99')
    expect(getSanitizedBooking(rawBooking).ownerName).toBe('Pinkey Jumpysnaps')
    expect(getSanitizedBooking(rawBooking).bookableName).toBe('Bottle Rocket Launcher')
    expect(getSanitizedBooking(rawBooking).locationName).toBe('Lala Land')
  })

  test('It should throw a meaningful error is booking is not valid', () => {
    rawBooking.id = undefined
    function tryToGetSanitizedBooking() {
      getSanitizedBooking(rawBooking)
    }
    const badParamError = new Error('The booking object supplied to getSanitizedBooking is not properly formed.')
    expect(tryToGetSanitizedBooking).toThrow(badParamError)
  })
})
