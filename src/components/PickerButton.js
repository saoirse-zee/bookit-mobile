import React from 'react'
import { StyleSheet, View, TouchableHighlight, Text } from 'react-native'
import colors from '../../constants/Colors'

const PickerButton = ({
  label,
  value,
  onPress,
  unitsLabel,
}) => (
  <TouchableHighlight style={styles.button} onPress={onPress}>
    <View style={styles.innerView}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{unitsLabel ? `${value} ${unitsLabel}` : value}</Text>
    </View>
  </TouchableHighlight>
)

export default PickerButton

const styles = StyleSheet.create({
  button: {
    margin: 15,
  },
  innerView: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  label: {
    color: '#555555',
    width: 60,
  },
  value: {
    fontSize: 18,
    color: colors.tintColor,
  },
})
