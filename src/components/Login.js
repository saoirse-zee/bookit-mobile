import React from 'react'
import { Button, View } from 'react-native'
import { connect } from 'react-redux'
import { AuthSession, FileSystem, Constants } from 'expo'
import jwtDecode from 'jwt-decode'
import config from '../../config.json'
import { getMSAuthUrl, isTestMode, handleError } from '../utils'
import { idTokenFileUri } from '../../constants/FileSystem'
import { setToken, removeToken, hideModal } from '../actions'

class Login extends React.Component {
  handleMSLoginPress = async () => {
    const { msAuthUrlOptions, authRedirectUrl } = config
    const authUrl = getMSAuthUrl(msAuthUrlOptions, authRedirectUrl)
    const returnUrl = Constants.linkingUri
    const result = await AuthSession.startAsync({ authUrl, returnUrl })
    const { handleLoginError } = this.props

    let idToken

    try {
      if (result.type === 'cancel') {
        throw new Error('The login process was canceled.')
      }
      if (result.type !== 'success') {
        throw new Error('Failed to auth with Microsoft')
      }
      if (result.params.error) {
        const errorMessage = `Failed to auth with Microsoft. Received this error: ${result.params.error}`
        throw new Error(errorMessage)
      }
      if (result.params.state !== config.msAuthUrlOptions.state) {
        throw new Error('Possible cross site forgery attack while attempting to auth with Microsoft. Check the `state` key in `config.json`.')
      }
      if (result.params && !result.params.id_token) {
        throw new Error('Unexpectedly failed to receive id token from Microsoft.')
      }

      // Check that the token is properly formed
      idToken = result.params.id_token
      jwtDecode(idToken)
    } catch (error) {
      handleLoginError(error)
    }

    // If idToken exists, we can finally log in
    if (idToken) {
      FileSystem.writeAsStringAsync(idTokenFileUri, idToken)
        .then(() => {
          this.props.setMSIdToken(idToken)
        })
    }
  }

  render() {
    const { fakeLogin } = this.props
    return (
      <View>
        <Button title="Log in with Microsoft" onPress={this.handleMSLoginPress} />
        {
          isTestMode() ?
            <Button testID="hero_login" title="Log in as test user" onPress={fakeLogin} /> :
            null
        }
      </View>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setMSIdToken: (token) => {
    dispatch(setToken(token))
    dispatch(hideModal())
  },
  fakeLogin: () => {
    dispatch(setToken('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1MTI2ODQyNDAsImV4cCI6MTkyMjkxMTQ0MCwiYXVkIjoiYm9va2l0LW1vYmlsZSIsInN1YiI6IlRoaXMgaXMgdGhlIHRlc3RlciIsIk5hbWUiOiJUZXN0IFVzZXIifQ.Dh8xPwNk9JW_PCumKwKLUskfLre3AW2glxNOKEq663s'))
    dispatch(hideModal())
  },
  handleLoginError: (authError) => {
    dispatch(removeToken())
    handleError(dispatch, authError)
  },
})

export default connect(null, mapDispatchToProps)(Login)
