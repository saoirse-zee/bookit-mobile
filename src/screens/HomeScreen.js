import React from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'

import { MonoText } from '../components/StyledText'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>A message for you:</Text>
        <MonoText style={styles.codeHighlightText}>hey</MonoText>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
