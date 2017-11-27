import React from 'react'
import { connect } from 'react-redux'
import ModalContent from './ModalContent'

const LoginModal = ({
  onOkayPress,
}) => {
  const message = 'Login form goes here.'
  return (
    <ModalContent
      title="Login"
      message={message}
      onOkayPress={onOkayPress}
    />
  )
}

export default connect()(LoginModal)
