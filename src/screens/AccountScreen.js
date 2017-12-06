import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import Login from '../components/Login'
import Logout from '../components/Logout'
import config from '../../config.json'


class AccountScreen extends React.Component {
  static navigationOptions = {
    title: 'Me',
  }

  render() {
    const { userExists } = this.props
    return (
      <View style={styles.container}>
        { config.nonce ? <Text testID="nonce" accessibilityLabel="nonce">{ config.nonce }</Text> : null }
        { userExists ? <Logout /> : <Login /> }
      </View>
    )
  }
}

const mapStateToProps = state => ({
  userExists: state.token, // Minimum criteria for existence
})

export default connect(mapStateToProps)(AccountScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
