import React from 'react'
import { connect } from 'react-redux'
import Message from './Message'
import * as utils from '../utils'

const BookingScreenMessage = ({
  formattedLastUpdated,
  isMakingNetworkRequest,
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

  return <Message message={message} />
}

const mapStateToProps = (state) => {
  const { lastUpdated } = state.bookings

  const isMakingNetworkRequest = utils.isMakingNetworkRequest(state)

  const formattedLastUpdated = lastUpdated && lastUpdated.toLocaleString({
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  })

  return {
    isMakingNetworkRequest,
    formattedLastUpdated,
  }
}

export default connect(mapStateToProps)(BookingScreenMessage)
