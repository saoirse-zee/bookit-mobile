import React from 'react'
import { Button, View } from 'react-native'
import { connect } from 'react-redux'
import { AuthSession, FileSystem } from 'expo'
import config from '../../config'
import { userInfoFileUri } from '../../constants/FileSystem'
import { setUser } from '../actions'

const FB_APP_ID = config.facebookAppId

class Login extends React.Component {
  handlePressAsync = async () => {
    const redirectUrl = AuthSession.getRedirectUrl()

    const result = await AuthSession.startAsync({
      authUrl:
        'https://www.facebook.com/v2.8/dialog/oauth?response_type=token' +
        `&client_id=${FB_APP_ID}` +
        `&redirect_uri=${encodeURIComponent(redirectUrl)}`,
    })

    if (result.type !== 'success') {
      throw new Error('Failed to auth with Facebook')
    }

    const accessToken = result.params.access_token
    const userInfoResponse = await fetch(`https://graph.facebook.com/me?access_token=${accessToken}&fields=id,name,picture.type(large)`)
    const user = await userInfoResponse.json()
    const stringifiedUser = JSON.stringify(user)

    FileSystem.writeAsStringAsync(userInfoFileUri, stringifiedUser)
      .then(() => {
        this.props.login(user)
      })
  }

  render() {
    return (
      <View>
        <Button title="Log in with Facebook" onPress={this.handlePressAsync} />
        <Button title="Log in as a gosh darn hero" onPress={this.props.fakeLogin} />
      </View>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  login: (user) => {
    dispatch(setUser(user))
    dispatch({ type: 'HIDE_MODAL' })
  },
  fakeLogin: () => {
    dispatch(setUser({
      id: '666',
      name: 'Calamity Jane',
      picture: {
        data: {
          url: 'https://www.famousbirthdays.com/faces/jane-calamity-image.jpg',
        },
      },
    }))
    dispatch({ type: 'HIDE_MODAL' })
  },
})

export default connect(null, mapDispatchToProps)(Login)
