import React from 'react'
import { Button, View, StyleSheet } from 'react-native'
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
      <View style={styles.container}>
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
    const testUserToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vMzdmY2YwZTQtY2ViOC00ODY2LThlMjYtMjkzYmFiMWUyNmE4L3YyLjAiLCJpYXQiOjE1MTMwMjM4NDQsImV4cCI6MTkyMzI1MTIzMSwiYXVkIjoiOWE4YjgxODEtYWZiMS00OGY4LWE4MzktYTg5NWQzOWY5ZGIwIiwic3ViIjoiWjRCeVBLR3JxOXBueE9uUEdkWlFXMGI5a0pvcWNRR1RHTWp2MVpEY1VLVSIsImFpbyI6IkFUUUF5LzhHQUFBQTRFeTl2d1VrbTBUTWh1R093bjE1MWwyRENiME00TnZqSERSSDM2M2U3eEQ0WFROeTdva1NLOXFuMVpHSFVuTEYiLCJhdF9oYXNoIjoic3ZvdldwdGl5VWJ3YVpqMV81X1M4QSIsIm5hbWUiOiJNb2JpbGUgVGVzdGVyIiwibm9uY2UiOiJkYmZiY2E4Zi1kMTdkLTRiZjgtYjVjMi1hYWY5ZTY0ZWRhMGUiLCJvaWQiOiJhZWE4MjhjYy04ODk1LTRjYTYtYTFhOS01ZDNlMWEyZmZkMzAiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtb2JpbGV0ZXN0QGJ1aWxkaXRjb250b3NvLm9ubWljcm9zb2Z0LmNvbSIsInRpZCI6IjM3ZmNmMGU0LWNlYjgtNDg2Ni04ZTI2LTI5M2JhYjFlMjZhOCIsInV0aSI6IjZDQnhHT09aODBDTGgwRVdySlV3QUEiLCJ2ZXIiOiIyLjAifQ.1Q15MmitXL_vLXIiPgfIvaX38eSY2O0W7xU-ywcg6M4'
    dispatch(setToken(testUserToken))
  },
  handleLoginError: (authError) => {
    dispatch(removeToken())
    handleError(dispatch, authError)
  },
})

export default connect(null, mapDispatchToProps)(Login)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
