import { DateTime } from 'luxon'
import { Constants } from 'expo'
import { showModal } from '../actions/modal'
import { setError } from '../actions/errors'

export getMSAuthUrl from './getMSAuthUrl'
export isFormValid from './isFormValid'
export getBookablesWithAvailability from './getBookablesWithAvailability'
export sortBookings from './sortBookings'
export isMakingNetworkRequest from './isMakingNetworkRequest'

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

export const isTestMode = () => {
  const appIsRunningInExpo = Constants.appOwnership === 'expo'
  const appIsUsingTestConfig = Constants.manifest.name.includes('Local Testing')
  return appIsRunningInExpo || appIsUsingTestConfig
}

export const handleError = (dispatch, error) => {
  dispatch(setError(error))
  dispatch(showModal({ modalType: 'ERROR' }))
}

export const userHasLoggedIn = (currentProps, nextProps) => (
  nextProps.userExists &&
    (currentProps.userExists !== nextProps.userExists)
)
