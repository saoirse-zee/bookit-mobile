import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { DateTime } from 'luxon'

import { fetchBookings } from '../actions'
import { getBookableNameFromId, getBookableLocationIdFromId, getLocationNameFromLocationId, getLocationFromLocationId } from '../utils'

const formatDate = (date, zoneName) => (
  DateTime.fromISO(date, { zone: zoneName }).toLocaleString(DateTime.DATETIME_FULL)
)

const BookingItem = ({
  booking,
  bookableName,
  bookableLocationName,
  location
}) => (
  <View style={{ margin: 20 }}>
    <Text>{bookableName} in {bookableLocationName}</Text>
    <Text>Start: {formatDate(booking.start, location.timeZone)}</Text>
    <Text>End: {formatDate(booking.start, location.timeZone)}</Text>
  </View>
)

class BookingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Bookings',
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchBookings())
  }

  render() {
    const { bookings, bookables, locations, lastUpdated } = this.props
    const formattedLastUpdated = lastUpdated && lastUpdated.toLocaleString({
      hour: 'numeric',
      minute: '2-digit',
      timeZoneName: 'short',
    })
    return (
      <View style={styles.container}>
        { lastUpdated ? (
          <Text>Last updated: { formattedLastUpdated }</Text>
        ) : (
          <Text>Loading...</Text>
        )}
        <Text>-----------------</Text>
        { bookings.items.map((booking) => {
          // bookables is only populated after the user has been to the Home screen,
          // and only then with the bookables for `location`
          // This works, for now, but need a more robust scheme.
          const bookableName = getBookableNameFromId(booking.bookableId, bookables)
          const bookableLocationId = getBookableLocationIdFromId(booking.bookableId, bookables)
          const bookableLocationName = getLocationNameFromLocationId(bookableLocationId, locations)
          const bookableLocation = getLocationFromLocationId(bookableLocationId, locations)
          return (
            <BookingItem
              key={`booking-${booking.id}`}
              booking={booking}
              bookableName={bookableName}
              bookableLocationName={bookableLocationName}
              location={bookableLocation}
            />
          )
        }) }
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  const { bookings, bookables, locations } = state
  return {
    bookings,
    bookables,
    locations,
    lastUpdated: state.bookings.lastUpdated,
  }
}
export default connect(mapStateToProps)(BookingsScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
