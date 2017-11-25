import 'react-native'
import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import renderer from 'react-test-renderer'
import ModalContent from '../modals/ModalContent'

it('renders correctly', () => {
  const tree = renderer.create(<ModalContent
    title="Hey, something happened!"
    message="And I'm going to tell you about it here."
    onOkayPress={() => {}}
  />).toJSON()

  expect(tree).toMatchSnapshot()
})
