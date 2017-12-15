import { Interval } from 'luxon'

// What type is booking.start, booking.end in the real world?

const bookablesFilter =
  (booking, bookings) => {
    const newInterval = Interval.fromDateTimes(booking.start, booking.end)
    return bookings
      .map(b => Interval.fromDateTimes(b.start, b.end))
      .filter(interval => interval.overlaps(newInterval))
  }

export default bookablesFilter
