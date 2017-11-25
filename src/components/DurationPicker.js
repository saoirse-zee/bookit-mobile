import React from 'react'
import {
  Modal,
  Button,
  Text,
  View,
  StyleSheet,
  Picker,
} from 'react-native'
import PickerButton from './PickerButton'

export default class DurationPicker extends React.Component {
  state = {
    selectedDuration: this.props.initialDuration,
    isPickerVisible: false,
  }

  render() {
    const {
      label,
      onDurationChange,
    } = this.props
    const { selectedDuration } = this.state
    return (
      <View>
        <PickerButton
          label={label}
          value={selectedDuration}
          unitsLabel="minutes"
          onPress={() => { this.setState({ isPickerVisible: true }) }}
        />

        <Modal visible={this.state.isPickerVisible}>
          <Text style={styles.title}>{label} of booking</Text>
          <Picker
            selectedValue={selectedDuration}
            onValueChange={(value) => {
              this.setState({ selectedDuration: value })
            }}
          >
            {[15, 30, 45, 60].map(duration => (
              <Picker.Item
                key={`duration-${duration}`}
                label={`${duration.toString()} minutes`}
                value={duration}
              />
              ))}
          </Picker>
          <Button
            title="OK"
            onPress={() => {
              this.setState({ isPickerVisible: false })
              onDurationChange(this.state.selectedDuration)
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
