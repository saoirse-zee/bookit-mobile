import { Constants } from 'expo'
import { isTestMode } from '../index'

describe('Test mode indicator', () => {
  test('returns true when Expo is running the app AND app is using the local testing configuration', () => {
    Constants.appOwnership = 'expo'
    Constants.manifest.name = 'Who cares what this says, because we only care about this --> Local Testing'
    expect(isTestMode()).toBe(true)
  })

  test('returns true when the app is built in Expo "standalone" mode', () => {
    Constants.appOwnership = 'standalone'
    Constants.manifest.name = 'Local Testing'
    expect(isTestMode()).toBe(true)
  })

  test('returns false when running with the production configuration', () => {
    Constants.appOwnership = 'standalone'
    Constants.manifest.name = 'Bookit Mobile'
    expect(isTestMode()).toBe(false)
  })
})
