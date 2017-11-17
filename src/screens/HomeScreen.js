import React from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { connect } from 'react-redux'

import { MonoText } from '../components/StyledText'

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  }

  render() {
    const { message } = this.props
    return (
      <View style={styles.container}>
        <Text>A message for you:</Text>
        <MonoText style={styles.codeHighlightText}>{ message }</MonoText>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  message: state,
})

export default connect(mapStateToProps)(HomeScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
