import React from 'react'
import { View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { DateTime } from 'luxon'
import BookingItem from '../components/BookingItem'
import LoginWarning from '../components/LoginWarning'
import BookingScreenMessage from '../components/BookingScreenMessage'
import { fetchBookings } from '../actions'
import {
  userHasLoggedIn,
  sortBookings,
  formatDate,
} from '../utils'

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
    const {
      userExists,
      bookings,
    } = this.props

    // "Protect" this screen, naively.
    if (!userExists) {
      return (
        <LoginWarning currentScreen="Bookings" />
      )
    }

    return (
      <View style={styles.container}>
        <BookingScreenMessage />

        <View style={styles.bookings} accessibilityLabel="List Of Bookings">
          { bookings.map((booking) => {
            const {
                id,
                bookable,
                user,
                start,
                end,
              } = booking
            const { location } = booking.bookable
            const locationName = location.name
            const bookableName = bookable.name
            const ownerName = user && user.name
            const formattedStart = formatDate(start, location.timeZone)
            const formattedEnd = formatDate(end, location.timeZone)
            const sanitizedBooking = {
              id,
              formattedStart,
              formattedEnd,
              ownerName,
              bookableName,
              locationName,
            }
            return (
              <BookingItem
                key={`booking-${booking.id}`}
                booking={sanitizedBooking}
                onPressItem={(_id) => {
                  // eslint-disable-next-line
                  console.log(_id)
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
  const { bookings } = state

  const now = DateTime.local()
  const upcomingBookings =
    bookings.items
      .sort(sortBookings)
      .filter(booking => DateTime.fromISO(booking.end) > now)

  return {
    bookings: upcomingBookings,
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
})
