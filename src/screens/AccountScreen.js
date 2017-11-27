import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

class AccountScreen extends React.Component {
  static navigationOptions = {
    title: 'Me',
  }

  componentDidMount() {
    const { dispatch } = this.props
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Info about the user goes here.</Text>
      </View>
    )
  }
}

export default connect()(AccountScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
