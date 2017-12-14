import React from 'react'
import { Modal, Button, DatePickerIOS, Text, View, StyleSheet } from 'react-native'
import moment from 'moment'
import 'moment-timezone'

import PickerButton from './PickerButton'

const getDate = date => (date ? date.toJSDate() : undefined)

export default class TimePicker extends React.Component {
  state = {
    date: this.props.date,
    isPickerVisible: false,
  }

  render() {
    const {
      label,
      onDateChange,
      minimumDate,
      maximumDate,
      bookableTimeZone,
    } = this.props
    const { date } = this.state
    const formattedStartTime = date.format('LT zz')
    return (
      <View>
        <PickerButton
          label={label}
          value={`${formattedStartTime}`}
          onPress={() => { this.setState({ isPickerVisible: true }) }}
        />

        <Modal
          visible={this.state.isPickerVisible}
          onRequestClose={() => this.setState({ isPickerVisible: false })}
        >
          <Text style={styles.title}>{label} time</Text>
          <DatePickerIOS
            date={date.toDate()}
            timeZoneOffsetInMinutes={date.utcOffset()}
            onDateChange={(value) => {
              const newDate = moment(value).tz(bookableTimeZone)
              this.setState({ date: newDate })
            }}
            minuteInterval={15}
            minimumDate={getDate(minimumDate)}
            maximumDate={getDate(maximumDate)}
          />
          <Button
            title="OK"
            onPress={() => {
              this.setState({ isPickerVisible: false })
              onDateChange(this.state.date)
            }}
            color="#dddddd"
          />
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    marginTop: 60,
    marginLeft: 30,
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 50,
  },
})
