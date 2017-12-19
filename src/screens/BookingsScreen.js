import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { DateTime } from 'luxon'
import BookingItem from '../components/BookingItem'
import LoginWarning from '../components/LoginWarning'
import { fetchBookings } from '../actions'
import {
  getBookableNameFromId,
  getBookableLocationIdFromId,
  getLocationNameFromLocationId,
  getLocationFromLocationId,
  userHasLoggedIn,
  sortBookings,
} from '../utils'
import colors from '../../constants/Colors'

class BookingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Bookings',
  }

  componentWillMount() {
    const { dispatch, userExists, token } = this.props
    if (userExists) {
      dispatch(fetchBookings(token))
    }
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props
    if (userHasLoggedIn(this.props, nextProps)) {
      dispatch(fetchBookings(nextProps.token))
    }
  }

  render() {
    // "Protect" this screen, naively.
    const { userExists } = this.props

    if (!userExists) {
      return (
        <LoginWarning currentScreen="Bookings" />
      )
    }

    const {
      bookings,
      bookables,
      locations,
      lastUpdated,
    } = this.props

    const formattedLastUpdated = lastUpdated && lastUpdated.toLocaleString({
      hour: 'numeric',
      minute: '2-digit',
      timeZoneName: 'short',
    })

    return (
      <View style={styles.container}>
        <View style={styles.updateMessageBox}>
          <Text style={styles.updateMessageText}>
            Last updated: { lastUpdated ? formattedLastUpdated : 'Never' }
          </Text>
        </View>

        <View style={styles.bookings} accessibilityLabel="List Of Bookings">
          { bookings.map((booking) => {
            // bookables is only populated after the user has been to the Home screen,
            // and only then with the bookables for `location`
            // This works, for now, but need a more robust scheme.
            const bookableName =
              getBookableNameFromId(booking.bookableId, bookables)
            const bookableLocationId =
              getBookableLocationIdFromId(booking.bookableId, bookables)
            const bookableLocationName =
              getLocationNameFromLocationId(bookableLocationId, locations)
            const bookableLocation =
              getLocationFromLocationId(bookableLocationId, locations)
            return (
              <BookingItem
                key={`booking-${booking.id}`}
                booking={booking}
                bookableName={bookableName}
                bookableLocationName={bookableLocationName}
                location={bookableLocation}
                onPressItem={(id) => {
                  // eslint-disable-next-line
                  console.log(id)
                }}
              />
            )
          }) }
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  const {
    selectedLocation, bookings, bookablesByLocation, locations,
  } = state

  // Bookables
  const { items: bookables } = bookablesByLocation[selectedLocation.id] || { items: [] }

  const now = DateTime.local()
  const upcomingBookings =
    bookings.items
      .sort(sortBookings)
      .filter(booking => DateTime.fromISO(booking.end) > now)

  return {
    bookings: upcomingBookings,
    bookables,
    locations,
    lastUpdated: state.bookings.lastUpdated,
    userExists: !!((state.token)), // Minimum criteria for existence
    token: state.token,
  }
}

export default connect(mapStateToProps)(BookingsScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bookings: {
    paddingLeft: 30,
  },
  updateMessageBox: {
    backgroundColor: colors.tintColor,
    padding: 10,
    paddingLeft: 30,
    marginBottom: 30,
  },
  updateMessageText: {
    color: 'white',
  },
})
