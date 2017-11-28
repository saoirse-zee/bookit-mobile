import React from 'react'
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native'
import colors from '../../../constants/Colors'

const ModalContent = ({
  title,
  message,
  onOkayPress,
  children,
}) => (
  <View>
    <Text style={styles.title}>{title}</Text>
    <Text>{ message }</Text>
    { children }
    {
      onOkayPress ? (
        <View style={styles.button}>
          <TouchableHighlight onPress={onOkayPress}>
            <Text style={styles.buttonText}>Okay</Text>
          </TouchableHighlight>
        </View>
      ) : null
    }
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
