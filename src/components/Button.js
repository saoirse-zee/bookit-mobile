import React from 'react'
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'

const Button = ({ label, onPress }) => (
  <TouchableHighlight
    onPress={onPress}
  >
    <View style={styles.button}>
      <Text style={styles.buttonLabel}>{label}</Text>
    </View>
  </TouchableHighlight>
)

export default Button

const styles = StyleSheet.create({
  button: {
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: 'tomato',
    padding: 30,
  },
  buttonLabel: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
})
