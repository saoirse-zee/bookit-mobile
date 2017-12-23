import 'react-native'
import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import renderer from 'react-test-renderer'
import BookingItem from '../BookingItem'

const stubPressHandler = () => {}
let booking

describe('BookingItem', () => {
  beforeEach(() => {
    booking = {
      id: 'BOOKING-ID-44',
      formattedStart: 'January 1, 2017 2:30 PM PST',
      formattedEnd: 'January 1, 2017 3:15 PM PST',
      ownerName: 'Johnny Popsqueak',
      bookableName: 'Leica FaceZoomer XLT-Max',
      locationName: 'NYC',
    }
  })

  it('displays the given booking', () => {
    const component = (
      <BookingItem
        booking={booking}
        onPressItem={stubPressHandler}
        selected="BOOKING-ID-37"
      />
    )
    const tree = renderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('highlights a selected booking by coloring the left border blue', () => {
    const component = (
      <BookingItem
        booking={booking}
        onPressItem={stubPressHandler}
        selected="BOOKING-ID-44"
      />
    )
    const tree = renderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('hides the owner name if the owner is not given', () => {
    booking.ownerName = undefined
    const component = (
      <BookingItem
        booking={booking}
        onPressItem={stubPressHandler}
        selected="BOOKING-ID-44"
      />
    )
    const tree = renderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
