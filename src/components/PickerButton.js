import React from 'react'
import { StyleSheet, View, TouchableHighlight, Text } from 'react-native'

const PickerButton = ({ label, value, onPress }) => (
  <View style={styles.button}>
    <Text style={styles.label}>{label}</Text>
    <TouchableHighlight onPress={onPress}>
      <Text style={styles.value}>{value}</Text>
    </TouchableHighlight>
  </View>
)

export default PickerButton

const styles = StyleSheet.create({
  button: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 30,
    alignItems: 'flex-end',
  },
  label: {
    color: '#555555',
    width: 50,
  },
  value: {
    fontSize: 18,
    color: 'tomato',
  },
})
