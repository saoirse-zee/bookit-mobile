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
  const { createBooking, bookables, selectedLocation } = state
  const { newBooking } = createBooking
  const { bookableId, start, end } = newBooking
  const bookableName = getBookableNameFromId(bookableId, bookables)
  const formattedStart = formatDate(start, selectedLocation.timeZone)
  const formattedEnd = formatDate(end, selectedLocation.timeZone)

  return {
    bookableName,
    formattedStart,
    formattedEnd,
    locationName: selectedLocation.name,
  }
}

export default connect(mapStateToProps)(BookingSuccessModal)
