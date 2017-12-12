import React from 'react'
import { DatePickerAndroid, TimePickerAndroid, View } from 'react-native'
import moment from 'moment'
import 'moment-timezone'

import PickerButton from './PickerButton'

export default class TimePicker extends React.Component {
  state = {
    date: this.props.date,
  }

  showDatePicker() {
    const {
      minimumDate,
      maximumDate,
      onDateChange,
      bookableTimeZone,
    } = this.props
    const { date } = this.state
    DatePickerAndroid.open({
      date: date.toDate(),
      minDate: minimumDate,
      maxDate: maximumDate,
    })
      .then((dateResults) => {
        if (dateResults.action === 'dateSetAction') {
          TimePickerAndroid.open({
            hour: date.hour(),
            minute: date.minute(),
          })
            .then((timeResults) => {
              const newDate = assembleDate(dateResults, timeResults, bookableTimeZone)
              this.setState({ date: newDate })
              onDateChange(newDate)
            })
        }
      })
  }

  render() {
    const {
      label,
    } = this.props
    const { date } = this.state
    const formattedStartTime = date.format('LT zz')
    return (
      <View>
        <PickerButton
          label={label}
          value={`${formattedStartTime}`}
          onPress={() => this.showDatePicker()}
        />
      </View>
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
}
