import 'react-native'
import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import renderer from 'react-test-renderer'
import Message from '../Message'

const stubPressHandler = () => {}

describe('Message box', () => {
  it('displays the given message', () => {
    const tree = renderer.create(<Message
      message="Hey there, friend."
      onPress={stubPressHandler}
    />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('has no background color when message prop is missing', () => {
    const tree = renderer.create(<Message
      onPress={stubPressHandler}
    />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('has no button when onPress prop is missing', () => {
    const tree = renderer.create(<Message
      message="Hey there, friend."
    />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
