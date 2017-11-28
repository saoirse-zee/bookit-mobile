import React from 'react'
import { View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import Login from '../components/Login'
import Logout from '../components/Logout'
import { removeUser } from '../actions'

class AccountScreen extends React.Component {
  static navigationOptions = {
    title: 'Me',
  }

  render() {
    const { userExists, dispatch } = this.props
    return (
      <View style={styles.container}>
        {
          userExists ?
            <Logout
              logout={() => dispatch(removeUser())}
            /> :
            <Login />
        }
      </View>
    )
  }
}

const mapStateToProps = state => ({
  userExists: !!((state.user && state.user.id)), // Minimum criteria for existence
})

export default connect(mapStateToProps)(AccountScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
