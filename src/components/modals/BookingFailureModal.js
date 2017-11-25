import React from 'react'
import { connect } from 'react-redux'
import ModalContent from './ModalContent'

const BookingFailureModal = ({ failureReason, onOkayPress }) => (
  <ModalContent
    title="Oh no."
    message={failureReason}
    onOkayPress={onOkayPress}
  />
)

const mapStateToProps = state => ({
  failureReason: state.createBookingStatus.reason,
})

export default connect(mapStateToProps)(BookingFailureModal)
