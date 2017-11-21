import axios from 'axios'
import config from '../../config'

const baseUrl = config.bookitApiBaseUrl

// eslint-disable-next-line import/prefer-default-export
export const postBooking = booking => new Promise((resolve, reject) => {
  if (!booking) {
    reject(new Error('Please provide a booking.'))
  }
  if (!booking.bookableId) {
    reject(new Error('Please select something to book.'))
  }
  axios.post(`${baseUrl}booking`, booking)
    .then((response) => {
      const newBooking = response.data
      resolve(newBooking)
    })
    .catch(() => {
      // TODO: If server passed error message, we could expose that to the user.
      reject(new Error('Something went wrong when trying to create the booking.'))
    })
})
