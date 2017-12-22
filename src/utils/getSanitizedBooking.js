import { formatDate } from '../utils'

const getSanitizedBooking = (booking) => {
  const {
    id,
    bookable,
    user,
    start,
    end,
  } = booking
  if (
    !id ||
    !bookable ||
    !user ||
    !start ||
    !end
  ) {
    throw new Error('The booking object supplied to getSanitizedBooking is not properly formed.')
  }
  const { location } = booking.bookable
  const locationName = location.name
  const bookableName = bookable.name
  const ownerName = user && user.name
  const formattedStart = formatDate(start, location.timeZone)
  const formattedEnd = formatDate(end, location.timeZone)
  const sanitizedBooking = {
    id,
    formattedStart,
    formattedEnd,
    ownerName,
    bookableName,
    locationName,
  }
  return sanitizedBooking
}

export default getSanitizedBooking
