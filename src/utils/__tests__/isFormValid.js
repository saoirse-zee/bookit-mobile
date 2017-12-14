import moment from 'moment'
import 'moment-timezone'
import { isFormValid } from '../index'


describe.only('Form validity checker', () => {
  test('returns false when bookable is missing', () => {
    const formData = {
      selectedBookableId: null,
      start: moment().add(1, 'hours').tz('America/Denver'),
      bookingDuration: 30,
    }
    expect(isFormValid(formData)).toBe(false)
  })

  test('returns false when start is in the past', () => {
    const formData = {
      selectedBookableId: '1',
      start: moment().subtract(1, 'week').tz('America/Denver'),
      bookingDuration: 30,
    }
    expect(isFormValid(formData)).toBe(false)
  })

  test('returns true when form data is all nice and neat', () => {
    const formData = {
      selectedBookableId: '1',
      start: moment().add(1, 'day').tz('America/Denver'),
      bookingDuration: 45,
    }
    expect(isFormValid(formData)).toBe(true)
  })
})
