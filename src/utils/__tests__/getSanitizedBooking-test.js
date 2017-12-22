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
    expect(getSanitizedBooking(rawBooking)).toEqual({
      id: 'BOOKING-99',
      formattedStart: 'November 17, 2017, 11:30 AM PST',
      formattedEnd: 'November 17, 2017, 12:30 PM PST',
      ownerName: 'Pinkey Jumpysnaps',
      bookableName: 'Bottle Rocket Launcher',
      locationName: 'Lala Land',
    })
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
