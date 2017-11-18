import React from 'react'
import {
  StyleSheet,
  View,
  FlatList,
} from 'react-native'
import { connect } from 'react-redux'
import { DateTime, Duration } from 'luxon'

import {
  fetchLocations,
  fetchBookables,
  fetchBookings,
  createBooking,
} from '../actions'
import { MonoText } from '../components/StyledText'
import BookableItem from '../components/BookableItem'
import Button from '../components/Button'
import TimePicker from '../components/TimePicker'

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  }

  static defaultProps = {
    selectedBookableId: null,
  }

  state = {
    selectedBookableId: this.props.selectedBookableId,
    start: this.props.start,
    bookingDuration: this.props.bookingDuration,
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

    const formattedStart =
      this.state.start.toLocaleString({
        hour: 'numeric',
        minute: '2-digit',
        timeZoneName: 'short',
      })
    const bookingDurationMinutes =
      this.state.bookingDuration.as('minutes')
    let message = `I want a room in ${location.name} at ${formattedStart} for ${bookingDurationMinutes} minute.`
    if (bookingSucceeded) {
      message = `You booked the ${newBookingBookableName}!`
    } else if (bookingSucceeded === false) {
      message = "Hm, that didn't work."
    }

    return (
      <View style={styles.container}>
        <MonoText style={{ marginBottom: 40 }}>{message}</MonoText>

        <TimePicker
          label="Start"
          date={this.state.start}
          onDateChange={(value) => {
            this.setState({ start: value })
          }}
          bookableTimeZone={location.timeZone}
        />

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
            const { start } = this.state
            const end = start.plus(this.state.bookingDuration)
            const booking = {
              bookableId: this.state.selectedBookableId,
              start: start.setZone('utc').toString(), // QUESTION: Why doesn't start.toISO() work?
              end: end.setZone('utc').toString(),
              subject: 'From Bookit mobile',
            }
            this.handleBookitPress(booking)
          }}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  const { location, locations, bookables } = state

  // Set Booking defaults
  const start = DateTime.local().setZone(location.timeZone)
  const bookingDuration = Duration.fromObject({ minutes: 1 })

  // Get results of posting a booking, once that happens
  const { newBooking, bookingSucceeded } = state.createBookingStatus
  const newBookingBookableName = bookables.reduce((acc, current) => (
    current.id === newBooking.bookableId ? current.name : acc
  ), '')

  return ({
    start,
    bookingDuration,
    location,
    locations,
    bookables,
    bookingSucceeded,
    newBookingBookableName,
  })
}

export default connect(mapStateToProps)(HomeScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 50,
    marginTop: 80,

    // justifyContent: 'center',
    // alignItems: 'center',
  },
})
