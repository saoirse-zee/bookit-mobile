import React from 'react'
import { connect } from 'react-redux'
import { Modal, View, StyleSheet } from 'react-native'
import { hideModal } from '../../actions'
import BookingSuccessModal from './BookingSuccessModal'
import BookingFailureModal from './BookingFailureModal'

const RootModal = ({
  modalType,
  modalProps,
  dispatch,
}) => {
  const MODAL_COMPONENTS = {
    BOOKING_SUCCESS: BookingSuccessModal,
    BOOKING_FAIL: BookingFailureModal,
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
          {...modalProps}
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
