import 'react-native'
import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import renderer from 'react-test-renderer'
import TechInfoModal from '../modals/TechInfoModal'

describe('Technical info modal', () => {
  it('displays the api url and nonce when these values are provided', () => {
    const tree = renderer.create(<TechInfoModal
      modalProps={{
        bookitApiBaseUrl: 'boohoo.com',
        nonce: 'Time to nonce.',
      }}
      onOkayPress={() => {}}
    />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('displays a fallback message when nonce is missing', () => {
    const tree = renderer.create(<TechInfoModal
      modalProps={{
        bookitApiBaseUrl: 'boohoo.com',
      }}
      onOkayPress={() => {}}
    />).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
