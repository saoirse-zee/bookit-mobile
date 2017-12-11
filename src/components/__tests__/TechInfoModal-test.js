import 'react-native'
import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import renderer from 'react-test-renderer'
import TechInfoModal from '../modals/TechInfoModal'

it('renders correctly', () => {
  const tree = renderer.create(<TechInfoModal
    onOkayPress={() => {}}
  />).toJSON()

  expect(tree).toMatchSnapshot()
})
