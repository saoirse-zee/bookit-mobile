import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { Platform, StatusBar, StyleSheet, View } from 'react-native'
import { AppLoading, Asset, Font, FileSystem } from 'expo'
// eslint-disable-next-line import/no-extraneous-dependencies
import { Ionicons } from '@expo/vector-icons'
import RootNavigation from './navigation/RootNavigation'
import root from './src/reducers'
import { userInfoFileUri } from './constants/FileSystem'
import { setUser, removeUser, showModal } from './src/actions'

const logger = store => next => (action) => {
  console.log('dispatching', action)
  const result = next(action)
  console.log('next state | user', store.getState().user)
  return result
}

const store = createStore(
  root,
  applyMiddleware(
    thunk,
    logger,
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

    FileSystem.getInfoAsync(userInfoFileUri)
      .then((getInforesult) => {
        if (getInforesult.exists) {
          return FileSystem.readAsStringAsync(userInfoFileUri)
            .then((result) => {
              const user = JSON.parse(result)
              // Check if user format is valid. This criteria could be whatever.
              if (user.id && user.name) {
                // User is already logged in.
                store.dispatch(setUser(user))
              } else {
                // User data is corrupt. Make them login.
                store.dispatch(removeUser())
                store.dispatch(showModal({ modalType: 'LOGIN' }))
              }
            })
        }
        // User not logged in.
        store.dispatch(removeUser())
        store.dispatch(showModal({ modalType: 'LOGIN' }))
      })
      .catch(error => console.log(error)),
  ])

  handleLoadingError = (error) => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error)
  }

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
