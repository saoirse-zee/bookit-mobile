import React from 'react'
import { View, StyleSheet, Button } from 'react-native'
import { connect } from 'react-redux'
import Login from '../components/Login'
import Logout from '../components/Logout'
import { showModal } from '../actions'

class AccountScreen extends React.Component {
  static navigationOptions = {
    title: 'Me',
  }

  render() {
    const { userExists, showTechInfo } = this.props
    return (
      <View style={styles.container}>
        <Button
          title="Tech info"
          onPress={showTechInfo}
        />
        { userExists ? <Logout /> : <Login /> }
      </View>
    )
  }
}

const mapStateToProps = state => ({
  userExists: state.token, // Minimum criteria for existence
})

const mapDispatchToProps = dispatch => ({
  showTechInfo: () => {
    dispatch(showModal({ modalType: 'TECHINFO' }))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
