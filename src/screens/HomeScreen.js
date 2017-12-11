
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
import { ShoutyText } from '../components/StyledText'
import BookableItem from '../components/BookableItem'
import Button from '../components/Button'
import TimePicker from '../components/TimePicker'
import DurationPicker from '../components/DurationPicker'
import RootModal from '../components/modals/RootModal'
import LoginWarning from '../components/LoginWarning'
import { userHasLoggedIn } from '../utils'

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

  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props
    if (userHasLoggedIn(this.props, nextProps)) {
      dispatch(fetchLocations(nextProps.token))
      dispatch(fetchBookables(nextProps.location.id, nextProps.token))
      dispatch(fetchBookings(nextProps.token))
    }
  }

  handleBookitPress = () => {
    const { dispatch, token } = this.props
    const formData = this.state
    dispatch(createBooking(formData, token))
  }

  handleBookablePress = (bookableId) => {
    this.setState({ selectedBookableId: bookableId })
  }

  render() {
    // "Protect" this screen, naively.
    const { userExists } = this.props

    if (!userExists) {
      return (
        <View style={{ marginTop: 90 }}>
          <RootModal />
          <LoginWarning currentScreen="home screen" />
        </View>
      )
    }

    const {
      location,
      bookables,
    } = this.props

    const formattedStart =
      this.state.start.toLocaleString({
        hour: 'numeric',
        minute: '2-digit',
      })
    const formattedBookingDuration =
      `${this.state.bookingDuration.as('minutes')} minutes`
    const message = `I want a room in NYC at ${formattedStart} for ${formattedBookingDuration}.`
    return (
      <View style={styles.container}>
        <RootModal />
        <View style={styles.formFields}>
          <ShoutyText>{ message }</ShoutyText>
          <TimePicker
            label="Start"
            date={this.state.start}
            onDateChange={(value) => {
              this.setState({ start: value })
            }}
            bookableTimeZone={location.timeZone}
          />

          <DurationPicker
            label="Length"
            initialDuration={this.state.bookingDuration.minutes}
            onDurationChange={(value) => {
              const bookingDuration = Duration.fromObject({ minutes: value })
              this.setState({ bookingDuration })
            }}
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

        </View>

        <Button
          label="Bookit"
          onPress={this.handleBookitPress}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  const { selectedLocation, locations, bookables } = state

  // Set Booking defaults
  const start = DateTime.local().plus({ hour: 1 }).setZone(selectedLocation.timeZone)
  const bookingDuration = Duration.fromObject({ minutes: 30 })

  return ({
    start,
    bookingDuration,
    location: selectedLocation,
    locations,
    bookables,
    userExists: !!((state.token)), // Minimum criteria for existence
    token: state.token,
  })
}

export default connect(mapStateToProps)(HomeScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 80,
    justifyContent: 'space-between',
  },
  formFields: {
    marginLeft: 30,
  },
})
