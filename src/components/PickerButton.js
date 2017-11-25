import React from 'react'
import { StyleSheet, View, TouchableHighlight, Text } from 'react-native'
import colors from '../../constants/Colors'

const PickerButton = ({
  label,
  value,
  onPress,
  unitsLabel,
}) => (
  <View style={styles.button}>
    <Text style={styles.label}>{label}</Text>
    <TouchableHighlight onPress={onPress}>
      <Text style={styles.value}>{unitsLabel ? `${value} ${unitsLabel}` : value}</Text>
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
    width: 60,
  },
  value: {
    fontSize: 18,
    color: colors.tintColor,
  },
})
