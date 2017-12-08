import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { Platform, StatusBar, StyleSheet, View } from 'react-native'
import { AppLoading, Asset, Font, FileSystem } from 'expo'
import jwtDecode from 'jwt-decode'
// eslint-disable-next-line import/no-extraneous-dependencies
import { Ionicons } from '@expo/vector-icons'
import RootNavigation from './navigation/RootNavigation'
import root from './src/reducers'
import { idTokenFileUri } from './constants/FileSystem'
import { setToken, removeToken, setError } from './src/actions'
import { handleError } from './src/utils'

const naiveLogger = store => next => (action) => {
  console.log('dispatching', action)
  const result = next(action)
  console.log('next state', store.getState())
  return result
}

const store = createStore(
  root,
  applyMiddleware(
    thunk,
    // naiveLogger,
  ),
)

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  }

  loadResourcesAsync = async () => Promise.all([
    Asset.loadAsync([
      require('./assets/images/robot-dev.png'),
      require('./assets/images/robot-prod.png'),
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free
      // to remove this if you are not using it in your app
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
    }),

    FileSystem.getInfoAsync(idTokenFileUri)
      .then((getInforesult) => {
        if (getInforesult.exists) {
          return FileSystem.readAsStringAsync(idTokenFileUri)
            .then((token) => {
              if (token) {
                // Make sure token format is valid.
                try {
                  jwtDecode(token)
                } catch (error) {
                  const nicerError = new Error('The JWT retrieved from the device file system was corrupt.')
                  throw nicerError
                }
                // User is already logged in.
                store.dispatch(setToken(token))
              }
            })
        }
      }),
  ])

  handleLoadingError = error => handleError(store.dispatch, error)

  handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true })
  }


  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this.loadResourcesAsync}
          onError={this.handleLoadingError}
          onFinish={this.handleFinishLoading}
        />
      )
    }
    return (
      <Provider store={store}>
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
          <RootNavigation />
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
})
