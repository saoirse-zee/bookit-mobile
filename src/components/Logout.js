import React from 'react'
import { Image, Button, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { FileSystem } from 'expo'
import { userInfoFileUri } from '../../constants/FileSystem'

class Logout extends React.Component {
  handlePressAsync = () => {
    this.props.logout()
    FileSystem.writeAsStringAsync(userInfoFileUri, JSON.stringify({}))
  }

  render() {
    const { user } = this.props
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ alignItems: 'center', marginBottom: 30 }}>
          <Image
            source={{ uri: user && user.picture && user.picture.data.url }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              marginBottom: 10,
            }}
          />
          <Text style={{ fontSize: 20 }}>{user.name}</Text>
        </View>
        <Button title="Log out" onPress={this.handlePressAsync} />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
})

export default connect(mapStateToProps)(Logout)
