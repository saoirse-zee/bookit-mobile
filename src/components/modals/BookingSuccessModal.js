import React from 'react'
import { connect } from 'react-redux'
import ModalContent from './ModalContent'
import { formatDate, getBookableNameFromId } from '../../utils'

const BookingSuccessModal = ({
  bookableName,
  onOkayPress,
  locationName,
  formattedStart,
  formattedEnd,
}) => {
  const message = `You have the ${bookableName} in ${locationName} from ${formattedStart} until ${formattedEnd}.`
  return (
    <ModalContent
      title="You booked it!"
      message={message}
      onOkayPress={onOkayPress}
    />
  )
}

const mapStateToProps = (state) => {
  const { createBookingStatus, bookables, location } = state
  const { newBooking } = createBookingStatus
  const { bookableId, start, end } = newBooking
  const bookableName = getBookableNameFromId(bookableId, bookables)
  const formattedStart = formatDate(start, location.timeZone)
  const formattedEnd = formatDate(end, location.timeZone)

  return {
    bookableName,
    formattedStart,
    formattedEnd,
    locationName: location.name,
  }
}

export default connect(mapStateToProps)(BookingSuccessModal)
