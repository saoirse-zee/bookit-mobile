import React from 'react'
import { DatePickerAndroid, TimePickerAndroid } from 'react-native'
import moment from 'moment'
import 'moment-timezone'

import PickerButton from './PickerButton'

export default class TimePicker extends React.Component {
  state = {
    date: this.props.date,
  }

  showDatePicker = async () => {
    const {
      onDateChange,
      bookableTimeZone,
    } = this.props
    const date = this.state.date.toDate()
    const dateResults = await DatePickerAndroid.open({ date })
    // The user pressed cancel
    if (dateResults.action !== 'dateSetAction') return
    const hour = this.state.date.hour()
    const minute = this.state.date.minute()
    const timeResults = await TimePickerAndroid.open({ hour, minute })
    // The user pressed cancel
    if (timeResults.action !== 'timeSetAction') return
    const newDate = assembleDate(dateResults, timeResults, bookableTimeZone)
    this.setState({ date: newDate })
    onDateChange(newDate)
  }

  render() {
    const {
      label,
    } = this.props
    const { date } = this.state
    const formattedStartTime = date.format('LT zz')
    return (
      <PickerButton
        label={label}
        value={`${formattedStartTime}`}
        onPress={this.showDatePicker}
      />
    )
  }
}

function assembleDate(dateResult, timeResult, timeZone) {
  return moment()
    .tz(timeZone)
    .year(dateResult.year)
    .month(dateResult.month)
    .date(dateResult.day)
    .hour(timeResult.hour)
    .minute(timeResult.minute)
    .second(0)
    .millisecond(0)
}
