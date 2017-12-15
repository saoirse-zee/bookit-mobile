import { DateTime, Duration, Interval } from 'luxon'

const getBookablesWithAvailability = (bookingFormData, bookables) => bookables.map((bookable) => {
  const zoneName = bookingFormData.location.timeZone

  const bookingFormDataStartJSDate = bookingFormData.start.toDate()

  // Make sure we're using the same time zone our user has chosen
  const bookingFormStart =
    DateTime.fromJSDate(bookingFormDataStartJSDate, { zone: zoneName })

  // The booking duration from the booking form is an integer representing minutes
  const duration = Duration.fromObject({ minutes: bookingFormData.bookingDuration })

  const bookingFormDataInterval = Interval.after(bookingFormStart, duration)

  let available = true

  if (bookable.bookings) {
    available = bookable.bookings.reduce((result, existingBooking) => {
      // These aren't really ISO strings, but we can pretend.
      const existingBookingStart =
        DateTime.fromISO(existingBooking.start, { zone: zoneName })
      const existingBookingEnd =
        DateTime.fromISO(existingBooking.end, { zone: zoneName })

      const existingBookingInterval =
        Interval.fromDateTimes(existingBookingStart, existingBookingEnd)
      const overlaps = existingBookingInterval.overlaps(bookingFormDataInterval)

      return overlaps ? false : result
    }, true)
  }

  return {
    ...bookable,
    available,
  }
})

export default getBookablesWithAvailability
