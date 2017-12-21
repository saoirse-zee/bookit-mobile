/* eslint key-spacing: 0 */
/* eslint no-multi-spacing: 0 */
import { sortBookings } from '../index'

describe('sortBookings', () => {
  it('returns -1 if the first booking starts before the second', () => {
    const a = {
      id:'11',
      bookableId:'camera-1',
      subject:'**********',
      start:'2017-01-01T09:15:00.000', // Start: Jan 1, 2017 9:15am
      end:  '2017-01-01T09:45:00.000', // End: Jan 1, 2017 9:45am
      user:{ id:'user-33', name:'Geoff Dumpty', externalId:'ms-user-66' },
    }
    const b = {
      id:'11',
      bookableId:'camera-2',
      subject:'**********',
      start:'2017-01-01T09:20:00.000', // Start: Jan 1, 2017 9:20am
      end:  '2017-01-01T09:45:00.000', // End: Jan 1, 2017 9:45am
      user:{ id:'user-33', name:'Geoff Dumpty', externalId:'ms-user-66' },
    }

    const result = sortBookings(a, b)

    expect(result).toEqual(-1)
  })

  it('returns 1 if the first booking starts after the second', () => {
    const a = {
      id:'11',
      bookableId:'camera-1',
      subject:'**********',
      start:'2017-01-01T09:15:00.000', // Start: Jan 1, 2017 9:15am
      end:  '2017-01-01T09:45:00.000', // End:   Jan 1, 2017 9:45am
      user:{ id:'user-33', name:'Geoff Dumpty', externalId:'ms-user-66' },
    }
    const b = {
      id:'11',
      bookableId:'camera-2',
      subject:'**********',
      start:'2017-01-01T09:00:00.000', // Start: Jan 1, 2017 9:00am
      end:  '2017-01-01T09:45:00.000', // End:   Jan 1, 2017 9:45am
      user:{ id:'user-33', name:'Geoff Dumpty', externalId:'ms-user-66' },
    }

    const result = sortBookings(a, b)

    expect(result).toEqual(1)
  })

  it('returns 0 if the two bookings start at the same time', () => {
    const a = {
      id:'11',
      bookableId:'camera-1',
      subject:'**********',
      start:'2017-01-01T09:15:00.000', // Start: Jan 1, 2017 9:15am
      end:  '2017-01-01T09:45:00.000', // End:   Jan 1, 2017 9:45am
      user:{ id:'user-33', name:'Geoff Dumpty', externalId:'ms-user-66' },
    }
    const b = {
      id:'11',
      bookableId:'camera-2',
      subject:'**********',
      start:'2017-01-01T09:15:00.000', // Start: Jan 1, 2017 9:15am
      end:  '2017-01-01T09:45:00.000', // End:   Jan 1, 2017 9:45am
      user:{ id:'user-33', name:'Geoff Dumpty', externalId:'ms-user-66' },
    }

    const result = sortBookings(a, b)

    expect(result).toEqual(0)
  })
})
