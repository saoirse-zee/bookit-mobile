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
      bookable: {
        location: {
          name: 'NYC',
          id: 'NYC-17',
          timeZone: 'America/Los_Angeles',
        },
      },
      start: '1996-01-13T14:30',
      end: '1996-01-13T15:15',
      user: {
        name: 'Johnny Popsqueak',
      },
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
    booking.user = undefined
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
