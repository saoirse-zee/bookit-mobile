import axios from 'axios'
import config from '../../config'

const baseUrl = config.bookitApiBaseUrl

// eslint-disable-next-line import/prefer-default-export
export const postBooking = formData => new Promise((resolve, reject) => {
  const {
    start,
    bookingDuration,
    selectedBookableId,
  } = formData

  if (!formData) {
    reject(new Error('Please provide a booking.'))
  }

  if (!selectedBookableId) {
    reject(new Error('Please select something to book.'))
  }

  const end = start.plus(bookingDuration)
  const formattedStartForAPI = `${start.toFormat('yyyy-MM-dd')}T${start.toFormat('TT')}`
  const formattedEndForAPI = `${end.toFormat('yyyy-MM-dd')}T${end.toFormat('TT')}`
  const data = {
    bookableId: selectedBookableId,
    start: formattedStartForAPI,
    end: formattedEndForAPI,
    subject: 'Booked by Bookit Mobile',
  }
  axios.post(`${baseUrl}booking`, data)
    .then((response) => {
      const newBooking = response.data
      resolve(newBooking)
    })
    .catch(() => {
      // TODO: If server passed error message, we could expose that to the user.
      reject(new Error('Something went wrong when trying to create the booking.'))
    })
})
