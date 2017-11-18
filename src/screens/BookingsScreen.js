import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import { fetchBookings } from '../actions'

class BookingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Bookings',
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchBookings())
  }

  render() {
    const { bookings } = this.props
    return (
      <View style={styles.container}>
        <Text>Bookings list</Text>
        { bookings.map(b => <Text key={`bookable-${b.id}`}>{b.subject}</Text>) }
      </View>
    )
  }
}

const mapStateToProps = state => ({
  bookings: state.bookings,
})

export default connect(mapStateToProps)(BookingsScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
