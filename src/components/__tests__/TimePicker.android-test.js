import React from 'react'
import moment from 'moment'
import 'moment-timezone'
import { shallow } from 'enzyme'
// eslint-disable-next-line import/no-extraneous-dependencies
import renderer from 'react-test-renderer'
// import { DatePickerAndroid, TimePickerAndroid } from 'react-native'
import TimePicker from '../TimePicker.android'

const mockDatePicker = { open: jest.fn() }
const mockTimePicker = { open: jest.fn() }
jest.mock('DatePickerAndroid', () => mockDatePicker)
jest.mock('TimePickerAndroid', () => mockTimePicker)


describe('Android Time Picker', () => {
  const date = moment('2017-12-12T22:56:54')

  beforeEach(() => {
    mockDatePicker.open.mockReturnValue({
      action: 'dateSetAction',
      year: 2018,
      month: 11,
      day: 25,
    })

    mockTimePicker.open.mockReturnValue({
      action: 'timeSetAction',
      hour: 12,
      minute: 30,
    })
  })
  it('displays the api url and nonce when these values are provided', async () => {
    const tree = renderer.create(<TimePicker
      label="Start"
      date={date}
      onDateChange={() => undefined}
      bookableTimeZone="America/New_York"
    />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('does not change the date if the user cancels date selection', async () => {
    const wrapper = shallow(<TimePicker
      label="Start"
      date={date}
      onDateChange={() => undefined}
      bookableTimeZone="America/New_York"
    />)
    mockDatePicker.open.mockReturnValue(Promise.resolve({ action: 'NOT dateSetAction' }))
    wrapper.instance().setState = jest.fn()
    await wrapper.instance().showDatePicker()
    expect(wrapper.instance().setState).not.toHaveBeenCalled()
  })

  it('does not change the date if the user cancels time selection', async () => {
    const wrapper = shallow(<TimePicker
      label="Start"
      date={date}
      onDateChange={() => undefined}
      bookableTimeZone="America/New_York"
    />)
    mockTimePicker.open.mockReturnValue(Promise.resolve({ action: 'NOT timeSetAction' }))
    wrapper.instance().setState = jest.fn()
    await wrapper.instance().showDatePicker()
    expect(wrapper.instance().setState).not.toHaveBeenCalled()
  })

  it('it updates itself with the new date when the user has selected a date', async () => {
    const wrapper = shallow(<TimePicker
      label="Start"
      date={date}
      onDateChange={() => undefined}
      bookableTimeZone="America/New_York"
    />)
    await wrapper.instance().showDatePicker()
    const expected = moment()
      .tz('America/New_York')
      .year(2018)
      .month(11)
      .date(25)
      .hour(12)
      .minute(30)
      .second(0)
      .millisecond(0)
    expect(wrapper.instance().state.date).toEqual(expected)
  })

  it('fires off the passed in "onDateChange" function after the user has picked a date', async () => {
    const onDateChanged = jest.fn()
    const wrapper = shallow(<TimePicker
      label="Start"
      date={date}
      onDateChange={onDateChanged}
      bookableTimeZone="America/New_York"
    />)
    await wrapper.instance().showDatePicker()
    const expected = moment()
      .tz('America/New_York')
      .year(2018)
      .month(11)
      .date(25)
      .hour(12)
      .minute(30)
      .second(0)
      .millisecond(0)
    expect(onDateChanged).toHaveBeenCalledWith(expected)
  })
})
