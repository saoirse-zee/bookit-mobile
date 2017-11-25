import React from 'react'
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native'
import colors from '../../../constants/Colors'

const ModalContent = ({
  title,
  message,
  onOkayPress,
}) => (
  <View>
    <Text style={styles.title}>{title}</Text>
    <Text>{ message }</Text>
    <View style={styles.button}>
      <TouchableHighlight onPress={onOkayPress}>
        <Text style={styles.buttonText}>Okay</Text>
      </TouchableHighlight>
    </View>
  </View>
)

export default ModalContent

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
  title: {
    color: colors.tintColor,
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 50,
  },
})
