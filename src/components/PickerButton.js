import React from 'react'
import { StyleSheet, View, TouchableHighlight, Text } from 'react-native'
import { LabelText } from './StyledText'
import colors from '../../constants/Colors'

const PickerButton = ({
  label,
  value,
  onPress,
  unitsLabel,
}) => (
  <View style={styles.button}>
    <LabelText style={styles.label}>{label}</LabelText>
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
    width: 60,
  },
  value: {
    fontSize: 18,
    color: colors.tintColor,
  },
})
