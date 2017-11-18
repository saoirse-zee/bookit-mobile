import React from 'react'
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'

const BookableItem = ({ room, onPressItem, selected }) => (
  <TouchableHighlight
    onPress={() => onPressItem(room.id)}
    underlayColor="#ddd"
  >
    <View style={[
      styles.room,
      room.id === selected ? styles.selected : styles.notSelected]}
    >
      <Text style={styles.roomName}>{room.name}</Text>
    </View>
  </TouchableHighlight>
)

export default BookableItem

const styles = StyleSheet.create({
  room: {
    marginBottom: 15,
    borderLeftWidth: 3,
    paddingLeft: 5,
  },
  roomName: {
    fontSize: 18,
  },
  notSelected: {
    borderLeftColor: '#eee',
  },
  selected: {
    borderLeftColor: 'tomato',
  },
})
