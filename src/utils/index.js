import { DateTime } from 'luxon'
import { Constants } from 'expo'

export const getBookableNameFromId =
  (bookableId, bookablesArray) => bookablesArray.reduce((result, current) => (
    bookableId === current.id ? current.name : result), '')

export const getBookableLocationIdFromId =
  (bookableId, bookablesArray) => bookablesArray.reduce((result, current) => (
    bookableId === current.id ? current.locationId : result), '')

export const getLocationNameFromLocationId =
  (locationId, locationArray) => locationArray.reduce((result, current) => (
    locationId === current.id ? current.name : result), '')

export const getLocationFromLocationId =
  (locationId, locationArray) => locationArray.reduce((result, current) => (
    locationId === current.id ? current : result), '')

export const formatDate =
  (date, zoneName) => (
    DateTime.fromISO(date, { zone: zoneName }).toLocaleString(DateTime.DATETIME_FULL)
  )

export const getMSAuthUrl = (options, redirectUrl) => (
  'https://login.microsoftonline.com/common/oauth2/v2.0/authorize' +
    `?client_id=${options.clientId}` +
    `&scope=${options.scope}` +
    `&response_type=${options.responseType}` +
    `&nonce=${options.nonce}` +
    `&redirect_uri=${redirectUrl}` +
    `&response_mode=${options.responseMode}` +
    `&state=${options.state}` +
    `&prompt=${options.prompt}` +
    `&login_hint=${options.loginHint}`
)

export const isTestMode = () => {
  const appIsRunningInExpo = Constants.appOwnership === 'expo'
  const appIsUsingTestConfig = Constants.manifest.name.includes('Local Testing')
  return appIsRunningInExpo || appIsUsingTestConfig
}
