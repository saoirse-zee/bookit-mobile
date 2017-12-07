import React from 'react'
import { connect } from 'react-redux'
import { Button, View, StyleSheet } from 'react-native'
import { FileSystem } from 'expo'
import jwtDecode from 'jwt-decode'
import { ShoutyText } from './StyledText'
import { idTokenFileUri } from '../../constants/FileSystem'
import { removeToken } from '../actions'

class Logout extends React.Component {
  handlePressAsync = () => {
    const blankToken = ''
    FileSystem.writeAsStringAsync(idTokenFileUri, blankToken)
      .then(() => {
        this.props.logout()
      })
  }

  render() {
    const { userName } = this.props
    return (
      <View style={styles.container}>
        <View style={{ alignItems: 'center', marginBottom: 30 }}>
          <ShoutyText>Hi {userName}!</ShoutyText>
        </View>
        <Button title="Log out" onPress={this.handlePressAsync} />
      </View>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(removeToken()),
})

const mapStateToProps = (state) => {
  const idToken = state.token
  let decodedToken
  try {
    decodedToken = jwtDecode(idToken)
  } catch (error) {
    throw new Error(`There was an error decoding the Microsoft id token: ${error.message}`)
  }
  return {
    userName: decodedToken.name,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout)

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  bodyText: {
    fontSize: 12,
    margin: 15,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
    fontSize: 8,
    marginLeft: 40,
    marginRight: 40,
  },
})
