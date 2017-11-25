import React from 'react'
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import { formatDate } from '../utils'
import colors from '../../constants/Colors'


const BookingItem = ({
  booking,
  location,
  bookableName,
  onPressItem,
  selected,
}) => {
  const start = formatDate(booking.start, location.timeZone)
  const end = formatDate(booking.end, location.timeZone)

  return (
    <TouchableHighlight
      onPress={() => onPressItem(booking.id)}
      underlayColor="#ddd"
    >
      <View style={[
        styles.booking,
        booking.id === selected ? styles.selected : styles.notSelected]}
      >
        <Text style={styles.bookingName}>{bookableName} in {location.name}</Text>
        <Text style={styles.date}>Start: {start}</Text>
        <Text style={styles.date}>End: {end}</Text>
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
