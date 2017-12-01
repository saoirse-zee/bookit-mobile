import React from 'react'
import { connect } from 'react-redux'
import { Button, View, Text, StyleSheet } from 'react-native'
import { FileSystem } from 'expo'
import { ShoutyText, MonoText } from './StyledText'
import { accessTokenFileUri } from '../../constants/FileSystem'
import { removeToken } from '../actions'

class Logout extends React.Component {
  handlePressAsync = () => {
    const blankToken = ''
    FileSystem.writeAsStringAsync(accessTokenFileUri, blankToken)
      .then(() => {
        this.props.logout()
      })
  }

  render() {
    const { partialToken } = this.props
    return (
      <View style={styles.container}>
        <View style={{ alignItems: 'center', marginBottom: 30 }}>
          <ShoutyText>Hey there!</ShoutyText>
          <Text style={styles.bodyText}>
            Psst, your access token looks something like this:
          </Text>
          <MonoText style={styles.codeHighlightText}>{ partialToken }</MonoText>
        </View>
        <Button title="Log out" onPress={this.handlePressAsync} />
      </View>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(removeToken()),
})

const mapStateToProps = state => ({
  partialToken: `${state.token.slice(0, 150)}...`,
})

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
