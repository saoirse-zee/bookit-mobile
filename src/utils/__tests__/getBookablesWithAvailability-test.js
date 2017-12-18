/* eslint key-spacing: 0 */
/* eslint no-multi-spacing: 0 */
import moment from 'moment'
import 'moment-timezone'
import { getBookablesWithAvailability } from '../index'

describe('getBookablesWithAvailability', () => {
  it('considers bookables with bookings that overlap the desired time slot to be unavailable', () => {
    const bookingFormData = {
      selectedBookableId:'camera-1',
      start: moment.tz('2017-01-01T09:00:00', 'Africa/Tunis'), // Start: Jan 1, 2017 9:00am
      bookingDuration: 30, // 30 minutes
      location: {
        id: 'tunis-01',
        name: 'Bab el Bhar',
        timeZone: 'Africa/Tunis',
      },
    }
    const bookables = [
      {
        id:'1',
        locationId:'tunis-01',
        name:'Diana Mini',
        disposition:{ closed:false, reason:'' },
        bookings:[{
          id:'11',
          bookableId:'camera-1',
          subject:'**********',
          start:'2017-01-01T09:15:00.000', // Start: Jan 1, 2017 9:15am
          end:  '2017-01-01T09:45:00.000', // End: Jan 1, 2017 9:45am
          user:{ id:'user-33', name:'Geoff Dumpty', externalId:'ms-user-66' },
        },
        ],
      },
      {
        id:'2',
        locationId:'tunis-01',
        name:'Blue Room',
        disposition:{ closed:false, reason:'' },
        bookings:[],
      },
    ]
    const expected = [
      {
        id:'1',
        locationId:'tunis-01',
        name:'Diana Mini',
        disposition:{ closed:false, reason:'' },
        bookings:[{
          id:'11',
          bookableId:'camera-1',
          subject:'**********',
          start:'2017-01-01T09:15:00.000', // Start: Jan 1, 2017 9:15am
          end:  '2017-01-01T09:45:00.000', // End: Jan 1, 2017 9:45am
          user:{ id:'user-33', name:'Geoff Dumpty', externalId:'ms-user-66' },
        },
        ],
        available: false,
      },
      {
        id:'2',
        locationId:'tunis-01',
        name:'Blue Room',
        disposition:{ closed:false, reason:'' },
        bookings:[],
        available: true,
      },
    ]
    const result = getBookablesWithAvailability(bookingFormData, bookables)

    expect(result).toEqual(expected)
  })

  it('considers bookables with bookings that abut the desired time slot to be available', () => {
    const bookingFormData = {
      selectedBookableId:'camera-1',
      start: moment.tz('2017-01-01T09:00:00', 'Africa/Tunis'), // Start: Jan 1, 2017 9:00am
      bookingDuration: 30, // 30 minutes
      location: {
        id: 'tunis-01',
        name: 'Bab el Bhar',
        timeZone: 'Africa/Tunis',
      },
    }
    const bookables = [
      {
        id:'1',
        locationId:'tunis-01',
        name:'Diana Mini',
        disposition:{ closed:false, reason:'' },
        bookings:[{
          id:'11',
          bookableId:'camera-1',
          subject:'**********',
          start:'2017-01-01T09:30:00.000', // Start: Jan 1, 2017 9:30am
          end:  '2017-01-01T10:00:00.000', // End: Jan 1, 2017 10:00am
          user:{ id:'user-33', name:'Geoff Dumpty', externalId:'ms-user-66' },
        },
        ],
      },
      {
        id:'2',
        locationId:'tunis-01',
        name:'Blue Room',
        disposition:{ closed:false, reason:'' },
        bookings:[],
      },
    ]
    const expected = [
      {
        id:'1',
        locationId:'tunis-01',
        name:'Diana Mini',
        disposition:{ closed:false, reason:'' },
        bookings:[{
          id:'11',
          bookableId:'camera-1',
          subject:'**********',
          start:'2017-01-01T09:30:00.000', // Start: Jan 1, 2017 9:15am
          end:  '2017-01-01T10:00:00.000', // End: Jan 1, 2017 9:45am
          user:{ id:'user-33', name:'Geoff Dumpty', externalId:'ms-user-66' },
        },
        ],
        available: true,
      },
      {
        id:'2',
        locationId:'tunis-01',
        name:'Blue Room',
        disposition:{ closed:false, reason:'' },
        bookings:[],
        available: true,
      },
    ]
    const result = getBookablesWithAvailability(bookingFormData, bookables)

    expect(result).toEqual(expected)
  })
})
