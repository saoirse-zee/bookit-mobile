import React from 'react'
import { connect } from 'react-redux'
import { Modal, View, StyleSheet } from 'react-native'
import { hideModal } from '../../actions'
import BookingSuccessModal from './BookingSuccessModal'
import ErrorModal from './ErrorModal'

const RootModal = ({
  modalType,
  modalProps,
  dispatch,
}) => {
  const MODAL_COMPONENTS = {
    BOOKING_SUCCESS: BookingSuccessModal,
    ERROR: ErrorModal,
  }

  if (!modalType) {
    return null
  }

  const SpecificModal = MODAL_COMPONENTS[modalType]

  return (
    <Modal
      visible={modalType !== null}
      animationType="fade"
    >
      <View style={styles.modal}>
        <SpecificModal
          modalProps={modalProps}
          onOkayPress={() => dispatch(hideModal())}
        />
      </View>
    </Modal>
  )
}

const mapStateToProps = state => state.modal

export default connect(mapStateToProps)(RootModal)

const styles = StyleSheet.create({
  modal: {
    marginTop: 60,
    marginLeft: 30,
    marginRight: 30,
  },
})
