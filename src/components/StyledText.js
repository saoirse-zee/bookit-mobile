import React from 'react'
import { Text } from 'react-native'

export const MonoText = props => (
  <Text {...props} style={[props.style, { fontFamily: 'space-mono' }]} />
)

export const ShoutyText = props => (
  <Text
    {...props}
    style={[props.style, {
      color: '#555',
      fontSize: 32,
      marginBottom: 50,
    }]}
  />
)
