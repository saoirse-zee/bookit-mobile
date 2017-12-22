import React from 'react'
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import { formatDate } from '../utils'
import colors from '../../constants/Colors'

const BookingItem = ({
  booking,
  onPressItem,
  selected,
}) => {
  const { bookable } = booking
  const { location } = booking.bookable
  const start = formatDate(booking.start, location.timeZone)
  const end = formatDate(booking.end, location.timeZone)
  const ownerName = booking.user ? booking.user.name : undefined

  return (
    <TouchableHighlight
      onPress={() => onPressItem(booking.id)}
      underlayColor="#ddd"
    >
      <View style={[
        styles.booking,
        booking.id === selected ? styles.selected : styles.notSelected]}
      >
        <Text style={styles.bookingName}>{bookable.name} in {location.name}</Text>
        <Text style={styles.date}>Start: {start}</Text>
        <Text style={styles.date}>End: {end}</Text>
        {
          ownerName ? <Text style={styles.date}>Booked by: {ownerName}</Text> : null
        }
      </View>
    </TouchableHighlight>
  )
}

export default BookingItem

const styles = StyleSheet.create({
  booking: {
    marginBottom: 15,
  },
  bookingName: {
    fontSize: 18,
  },
  date: {
    fontSize: 13,
  },
  notSelected: {
    borderLeftColor: '#eee',
  },
  selected: {
    borderLeftColor: colors.tintColor,
  },
})
