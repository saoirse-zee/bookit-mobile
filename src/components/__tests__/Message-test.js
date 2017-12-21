import 'react-native'
import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import renderer from 'react-test-renderer'
import Message from '../Message'

describe('Message box', () => {
  it('displays the given message', () => {
    const tree = renderer.create(<Message
      message="Hey there, friend."
    />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('returns nothing when message prop is missing', () => {
    const tree = renderer.create(<Message />).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
