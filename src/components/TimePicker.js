import React from 'react'
import { Modal, Button, DatePickerIOS, Text, View, StyleSheet } from 'react-native'
import { DateTime } from 'luxon'
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
    const formattedStartTime = date.toLocaleString({
      hour: 'numeric',
      minute: '2-digit',
      timeZoneName: 'short',
    })
    return (
      <View>
        <PickerButton
          label={label}
          value={`${formattedStartTime}`}
          onPress={() => { this.setState({ isPickerVisible: true }) }}
        />

        <Modal visible={this.state.isPickerVisible}>
          <Text style={styles.title}>{label} time</Text>
          <DatePickerIOS
            date={this.state.date.toJSDate({ zone: bookableTimeZone })}
            timeZoneOffsetInMinutes={this.state.date.offset}
            onDateChange={(value) => {
              const newDate = DateTime.fromJSDate(value, { zone: bookableTimeZone })
              console.log(newDate.toLocaleString({
                hour: 'numeric',
                minute: '2-digit',
                timeZoneName: 'short',
              }))
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
