import React from 'react'
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import colors from '../../constants/Colors'

const BookingItem = ({
  booking,
  onPressItem,
  selected,
}) =>
  (
    <TouchableHighlight
      onPress={() => onPressItem(booking.id)}
      underlayColor="#ddd"
    >
      <View style={[
      styles.booking,
      booking.id === selected ? styles.selected : styles.notSelected]}
      >
        <Text style={styles.bookingName}>{booking.bookableName} in {booking.locationName}</Text>
        <Text style={styles.date}>Start: {booking.formattedStart}</Text>
        <Text style={styles.date}>End: {booking.formattedEnd}</Text>
        {
        booking.ownerName ? <Text style={styles.date}>Booked by: {booking.ownerName}</Text> : null
      }
      </View>
    </TouchableHighlight>
  )


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
