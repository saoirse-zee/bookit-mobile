import React from 'react'
import { connect } from 'react-redux'
import Message from './Message'
import * as utils from '../utils'

const BookingScreenMessage = ({ message }) => <Message message={message} />

const mapStateToProps = (state) => {
  const isMakingNetworkRequest = utils.isMakingNetworkRequest(state)
  const message = isMakingNetworkRequest ? 'Talking to Bookit API...' : undefined
  return { message }
}

export default connect(mapStateToProps)(BookingScreenMessage)
