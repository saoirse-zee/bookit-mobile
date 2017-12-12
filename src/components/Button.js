import React from 'react'
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import colors from '../../constants/Colors'

const Button = ({ label, onPress, disabled = true }) => (
  <TouchableHighlight
    onPress={disabled ? onPress : null}
  >
    <View style={
        disabled ?
          [styles.button, styles.disabledButton] :
          styles.button
        }
    >
      <Text style={
        disabled ?
          [styles.buttonLabel, styles.disabledButtonLabel] :
          styles.buttonLabel
        }
      >{label}
      </Text>
    </View>
  </TouchableHighlight>
)

export default Button

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.tintColor,
    padding: 30,
  },
  disabledButton: {
    backgroundColor: colors.disabled,
  },
  buttonLabel: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  disabledButtonLabel: {
    color: 'gray',
  },
})
