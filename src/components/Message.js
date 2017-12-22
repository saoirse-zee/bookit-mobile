import React from 'react'
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import colors from '../../constants/Colors'

const Message = ({ message, onPress, buttonLabel }) => (
  <View style={message ? styles.container : [styles.container, styles.emptyContainer]}>
    <Text style={styles.text}>
      { message }
    </Text>
    {
      onPress ? (
        <TouchableHighlight
          onPress={onPress}
          underlayColor={colors.tintColorDarkened}
        >
          <Text style={styles.text}>{buttonLabel}</Text>
        </TouchableHighlight>
      ) : null
    }
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxHeight: 40,
    paddingLeft: 30,
    backgroundColor: colors.tintColor,
  },
  emptyContainer: {
    backgroundColor: undefined,
  },
  text: {
    color: 'white',
    padding: 10,
  },
})

export default Message
