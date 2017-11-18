import React from 'react'
import {
  StyleSheet,
  View,
  FlatList,
} from 'react-native'
import { connect } from 'react-redux'
import moment from 'moment-timezone'

import {
  fetchLocations,
  fetchBookables,
  fetchBookings,
  createBooking,
} from '../actions'
import { MonoText } from '../components/StyledText'
import BookableItem from '../components/BookableItem'
import Button from '../components/Button'

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  }

  static defaultProps = {
    selectedBookableId: null,
  }

  state = {
    selectedBookableId: this.props.selectedBookableId,
  }

  componentDidMount() {
    const { location, dispatch } = this.props
    dispatch(fetchLocations())
    dispatch(fetchBookables(location.id))
    dispatch(fetchBookings())
  }

  handleBookitPress = (booking) => {
    const { dispatch } = this.props
    dispatch(createBooking(booking))
  }

  handleBookablePress = (bookableId) => {
    this.setState({ selectedBookableId: bookableId })
  }

  render() {
    const {
      location,
      bookables,
      newBookingBookableName,
      bookingSucceeded,
    } = this.props
    let message = 'Press the button.'
    if (bookingSucceeded) {
      message = `You booked the ${newBookingBookableName}!`
    } else if (bookingSucceeded === false) {
      message = "Hm, that didn't work."
    }
    return (
      <View style={styles.container}>
        <MonoText style={{ margin: 30 }}>{message}</MonoText>
        <FlatList
          data={bookables}
          extraData={this.state}
          renderItem={({ item }) => (
            <BookableItem
              room={item}
              selected={this.state.selectedBookableId}
              onPressItem={this.handleBookablePress}
            />
          )}
          keyExtractor={(item => item.id)}
        />
        <Button
          label="Bookit"
          onPress={() => {
            const start = moment().add(1, 'hour')
            const end = start.clone().add(1, 'minute')
            const booking = {
              bookableId: this.state.selectedBookableId,
              start: start.tz(location.timeZone).format('YYYY-MM-DDTHH:mm'),
              end: end.tz(location.timeZone).format('YYYY-MM-DDTHH:mm'),
              subject: `Created: ${start.format()}`,
            }
            this.handleBookitPress(booking)
          }}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  const { bookables } = state
  const { newBooking } = state.createBookingStatus
  const newBookingBookableName = bookables.reduce((acc, current) => (
    current.id === newBooking.bookableId ? current.name : acc
  ), '')

  return ({
    location: state.location,
    locations: state.locations,
    bookables,
    bookingSucceeded: state.createBookingStatus.bookingSucceeded,
    newBookingBookableName,
  })
}

export default connect(mapStateToProps)(HomeScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
