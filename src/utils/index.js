import { DateTime } from 'luxon'
import { Constants } from 'expo'
import { showModal } from '../actions/modal'
import { setError } from '../actions/errors'

export getMSAuthUrl from './getMSAuthUrl'
export isFormValid from './isFormValid'
export getBookablesWithAvailability from './getBookablesWithAvailability'
export sortBookings from './sortBookings'
export isMakingNetworkRequest from './isMakingNetworkRequest'

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
