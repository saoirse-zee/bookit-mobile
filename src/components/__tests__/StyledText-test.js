import 'react-native'
import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import renderer from 'react-test-renderer'
import { MonoText, ShoutyText, LabelText } from '../StyledText'

it('renders MonoText correctly', () => {
  const tree = renderer.create(<MonoText>Snapshot test!</MonoText>).toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders ShoutyText correctly', () => {
  const tree = renderer.create(<ShoutyText>Snapshot test!</ShoutyText>).toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders LabelText correctly', () => {
  const tree = renderer.create(<LabelText>Snapshot test!</LabelText>).toJSON()
  expect(tree).toMatchSnapshot()
})

it('respects optional styles for LabelText', () => {
  const tree = renderer.create(<LabelText style={{ color: 'tomato' }}>Snapshot test!</LabelText>).toJSON()
  expect(tree).toMatchSnapshot()
})
