import React from 'react'
import { connect } from 'react-redux'
import ModalContent from './ModalContent'

const BookingFailureModal = ({ failureReason, onOkayPress }) => (
  <ModalContent
    title="Booking Error"
    message={failureReason}
    onOkayPress={onOkayPress}
  />
)

const mapStateToProps = state => ({
  failureReason: state.createBooking.reason,
})

export default connect(mapStateToProps)(BookingFailureModal)
