import React from 'react'
import { connect } from 'react-redux'
import Message from './Message'
import * as utils from '../utils'
import {
  fetchLocations,
  fetchBookables,
  fetchBookings,
} from '../actions'

const BookingScreenMessage = ({
  formattedLastUpdated,
  isMakingNetworkRequest,
  dispatch,
  token,
  locationId,
}) => {
  let message

  if (isMakingNetworkRequest) {
    message = 'Talking to Bookit API...'
    return <Message message={message} />
  }

  message =
    formattedLastUpdated ?
      `Last updated: ${formattedLastUpdated}` :
      'Last updated: Never'

  return (
    <Message
      message={message}
      onPress={() => {
        dispatch(fetchLocations(token))
        dispatch(fetchBookables(locationId, token))
        dispatch(fetchBookings(token))
      }}
      buttonLabel="Refresh"
    />
  )
}

const mapStateToProps = (state) => {
  const { token, selectedLocation } = state
  const { lastUpdated } = state.bookings
  const locationId = selectedLocation.id

  const isMakingNetworkRequest = utils.isMakingNetworkRequest(state)

  const formattedLastUpdated = lastUpdated && lastUpdated.toLocaleString({
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  })

  return {
    isMakingNetworkRequest,
    formattedLastUpdated,
    token,
    locationId,
  }
}

export default connect(mapStateToProps)(BookingScreenMessage)
