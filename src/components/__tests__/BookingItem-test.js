import 'react-native'
import React from 'react'
import { DateTime } from 'luxon'
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
      start: DateTime.fromObject({
        day: 13,
        hour: 8,
        minute: 30,
        zone: 'America/Los_Angeles',
      }),
      end: DateTime.fromObject({
        day: 13,
        hour: 9,
        minute: 30,
        zone: 'America/Los_Angeles',
      }),
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
