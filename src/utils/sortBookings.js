import { DateTime } from 'luxon'

const sortBookings = (bookingA, bookingB) => {
  const aStart = DateTime.fromISO(bookingA.start)
  const bStart = DateTime.fromISO(bookingB.start)
  if (aStart < bStart) {
    return -1
  }
  if (aStart > bStart) {
    return 1
  }
  return 0
}

export default sortBookings
