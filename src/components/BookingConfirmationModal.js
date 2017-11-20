import React from 'react'
import { Modal, View, Text, TouchableHighlight, StyleSheet } from 'react-native'
import colors from '../../constants/Colors'

const BookitConfirmationModal = ({
  visible,
  success,
  newBookingBookableName,
  onOkayPress,
}) => {
  const successMessage = (
    <View>
      <Text style={styles.title}>You booked it!</Text>
      <Text>You have the {newBookingBookableName}.</Text>
    </View>
  )

  const failureMessage = (
    <View>
      <Text style={styles.title}>Hrm.</Text>
      <Text>Something went wrong.</Text>
    </View>
  )

  return (
    <Modal
      visible={visible}
      animationType="fade"
    >
      <View style={styles.modal}>
        { success ? successMessage : failureMessage }
        <View style={styles.button}>
          <TouchableHighlight onPress={onOkayPress}>
            <Text style={styles.buttonText}>Okay</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  )
}

export default BookitConfirmationModal

const styles = StyleSheet.create({
  button: {
    padding: 20,
    alignItems: 'center',
    marginTop: 50,
  },
  buttonText: {
    fontSize: 24,
    color: colors.tintColor,
  },
  cancelButton: {
    padding: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'rgb(245, 17, 174)',
  },
  modal: {
    marginTop: 60,
    marginLeft: 30,
    marginRight: 30,
  },
  title: {
    color: colors.tintColor,
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 50,
  },
})
