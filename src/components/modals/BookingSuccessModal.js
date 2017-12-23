import React from 'react'
import { connect } from 'react-redux'
import ModalContent from './ModalContent'
import { getSanitizedBooking } from '../../utils'

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
  const { createBooking } = state
  const { newBooking } = createBooking
  const sanitizedBooking = getSanitizedBooking(newBooking)
  const {
    bookableName,
    formattedStart,
    formattedEnd,
    locationName,
  } = sanitizedBooking

  return {
    bookableName,
    formattedStart,
    formattedEnd,
    locationName,
  }
}

export default connect(mapStateToProps)(BookingSuccessModal)
