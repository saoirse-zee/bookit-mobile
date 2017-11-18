import React from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { connect } from 'react-redux'

import { fetchLocations, fetchBookables, fetchBookings } from '../actions'
import { MonoText } from '../components/StyledText'

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  }

  componentDidMount() {
    const { location, dispatch } = this.props
    dispatch(fetchLocations())
    dispatch(fetchBookables(location.id))
    dispatch(fetchBookings())
  }

  render() {
    const {
      location,
      locations,
      bookables,
      bookings,
    } = this.props

    return (
      <View style={styles.container}>
        <MonoText>Locations</MonoText>
        { locations.map(l => <Text key={`location-${l.id}`}>{l.name}</Text>)}
        <Text>-----------------</Text>
        <MonoText>Bookables in { location.name }</MonoText>
        { bookables.map(b => <Text key={`bookable-${b.id}`}>{b.name}</Text>)}
        <Text>-----------------</Text>
        <MonoText>Bookings</MonoText>
        { bookings.map(b => <Text key={`bookable-${b.id}`}>{b.subject}</Text>) }
      </View>
    )
  }
}

const mapStateToProps = state => ({
  message: state.hi,
  location: state.location,
  locations: state.locations,
  bookables: state.bookables,
  bookings: state.bookings,
})

export default connect(mapStateToProps)(HomeScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
