import React from 'react'
import { Text } from 'react-native'

// eslint-disable-next-line import/prefer-default-export
export const MonoText = props => (
  // eslint-disable-next-line react/prop-types
  <Text {...props} style={[props.style, { fontFamily: 'space-mono' }]} />
)
