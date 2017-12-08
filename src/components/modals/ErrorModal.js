import React from 'react'
import { connect } from 'react-redux'
import ModalContent from './ModalContent'
import { removeError, hideModal } from '../../actions'

const ErrorModal = ({
  onOkayPress,
  errorMessage,
}) => (
  <ModalContent
    title="There was an error :("
    message={errorMessage}
    onOkayPress={onOkayPress}
  />
)

const mapStateToProps = (state) => {
  const errorMessage = state.errors.message || 'This is all we know.'
  return ({
    errorMessage,
  })
}

const mapDispatchToProps = dispatch => ({
  onOkayPress: () => {
    dispatch(removeError())
    dispatch(hideModal())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ErrorModal)
