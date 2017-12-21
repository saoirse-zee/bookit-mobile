import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import colors from '../../constants/Colors'

const Message = ({ message }) => (
  message ? (
    <View style={styles.container}>
      <Text style={styles.text}>
        { message }
      </Text>
    </View>
  ) : null
)

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.tintColor,
    padding: 10,
    paddingLeft: 30,
    marginBottom: 30,
  },
  text: {
    color: 'white',
  },
})

export default Message
