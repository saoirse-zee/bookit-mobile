
import React from 'react'
import {
  StyleSheet,
  View,
  FlatList,
  ScrollView,
} from 'react-native'
import { connect } from 'react-redux'
import moment from 'moment'
import 'moment-timezone'

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
import { userHasLoggedIn, isFormValid } from '../utils'

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

  componentWillMount() {
    const {
      dispatch,
      userExists,
      token,
      location,
    } = this.props
    if (userExists) {
      dispatch(fetchLocations(token))
      dispatch(fetchBookables(location.id, token))
      dispatch(fetchBookings(token))
    }
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

    // const fakeBookables = [
    //   {
    // eslint-disable-next-line max-len
    //     id: '1c824c61-7539-41d7-b723-d4447826ba50q', locationId: 'b1177996-75e2-41da-a3e9-fcdd75d1ab31', name: 'Black Room', disposition: { closed: false, reason: '' }, bookings: [],
    //   },
    //   {
    // eslint-disable-next-line max-len
    //     id: '1c824c61-7539-41d7-b723-d4447826ba50w', locationId: 'b1177996-75e2-41da-a3e9-fcdd75d1ab31', name: 'Black Room', disposition: { closed: false, reason: '' }, bookings: [],
    //   },
    //   {
    // eslint-disable-next-line max-len
    //     id: '1c824c61-7539-41d7-b723-d4447826ba501', locationId: 'b1177996-75e2-41da-a3e9-fcdd75d1ab31', name: 'Black Room', disposition: { closed: false, reason: '' }, bookings: [],
    //   },
    //   {
    // eslint-disable-next-line max-len
    //     id: '1c824c61-7539-41d7-b723-d4447826ba502', locationId: 'b1177996-75e2-41da-a3e9-fcdd75d1ab31', name: 'Black Room', disposition: { closed: false, reason: '' }, bookings: [],
    //   },
    //   {
    // eslint-disable-next-line max-len
    //     id: '1c824c61-7539-41d7-b723-d4447826ba503', locationId: 'b1177996-75e2-41da-a3e9-fcdd75d1ab31', name: 'Black Room', disposition: { closed: false, reason: '' }, bookings: [],
    //   },
    //   {
    // eslint-disable-next-line max-len
    //     id: '1c824c61-7539-41d7-b723-d4447826ba504', locationId: 'b1177996-75e2-41da-a3e9-fcdd75d1ab31', name: 'Black Room', disposition: { closed: false, reason: '' }, bookings: [],
    //   },
    //   {
    // eslint-disable-next-line max-len
    //     id: '23787564-e99d-4741-b285-4d17cc29bf8d', locationId: 'b1177996-75e2-41da-a3e9-fcdd75d1ab31', name: 'Blue Room', disposition: { closed: false, reason: '' }, bookings: [],
    //   },
    //   {
    // eslint-disable-next-line max-len
    //     id: '25708e84-cf1b-45aa-b062-0af903328a52', locationId: 'b1177996-75e2-41da-a3e9-fcdd75d1ab31', name: 'White Room', disposition: { closed: false, reason: '' }, bookings: [],
    //   },
    //   {
    // eslint-disable-next-line max-len
    //     id: 'a7b68976-8dda-44f2-8e39-4e2b6c3514cd', locationId: 'b1177996-75e2-41da-a3e9-fcdd75d1ab31', name: 'Green Room', disposition: { closed: false, reason: '' }, bookings: [],
    //   },
    //   {
    // eslint-disable-next-line max-len
    //     id: 'aab6d676-d3cb-4b9b-b285-6e63058aeda8', locationId: 'b1177996-75e2-41da-a3e9-fcdd75d1ab31', name: 'Red Room', disposition: { closed: false, reason: '' }, bookings: [],
    //   },
    //   {
    // eslint-disable-next-line max-len
    //     id: 'cc4bd7e5-00f6-4903-86a2-abf5423edb84', locationId: 'b1177996-75e2-41da-a3e9-fcdd75d1ab31', name: 'Yellow Room', disposition: { closed: true, reason: 'Closed for remodeling' }, bookings: [],
    //   },
    // ]

    const formattedStart =
      this.state.start.format('LT')
    const formattedBookingDuration = `${this.state.bookingDuration} minutes`
    const message = `I want a room in NYC at ${formattedStart} for ${formattedBookingDuration}.`
    return (
      <View style={styles.container}>
        <RootModal />
        <ScrollView scrollEnabled={false}>
          <View style={styles.formFields}>
            <ShoutyText>{ message }</ShoutyText>
            <View style={styles.pickers}>
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
                initialDuration={this.state.bookingDuration}
                onDurationChange={(value) => {
                  this.setState({ bookingDuration: value })
                }}
              />
            </View>
            <ScrollView style={styles.bookablesList}>
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
            </ScrollView>
          </View>
        </ScrollView>

        <Button
          label="Bookit"
          onPress={this.handleBookitPress}
          disabled={!isFormValid(this.state)}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  const { selectedLocation, locations, bookables } = state
  // Set Booking defaults
  const start = moment().add(1, 'hours').tz(selectedLocation.timeZone)
  const bookingDuration = 30

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
    marginTop: 40,
    justifyContent: 'space-between',
  },
  formFields: {
    marginLeft: 30,
  },
  pickers: {
    padding: 25,
  },
  bookablesList: {
    // maxHeight: 300,
  },
})
