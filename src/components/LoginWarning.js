import React from 'react'
import { View, StyleSheet } from 'react-native'
import { ShoutyText } from './StyledText'

const LoginWarning = ({ currentScreen }) => (
  <View style={styles.container}>
    <ShoutyText>You need to log in to see the { currentScreen }.</ShoutyText>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
})

export default LoginWarning
