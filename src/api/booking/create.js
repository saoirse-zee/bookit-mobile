import axios from 'axios'
import config from '../../../config.json'

const baseUrl = config.bookitApiBaseUrl

// eslint-disable-next-line import/prefer-default-export
const createBooking = (formData, token) => new Promise((resolve, reject) => {
  if (!token) {
    reject('createBooking() needs a jwt to identify the user')
  }

  if (!formData) {
    reject('createBooking() needs booking data')
  }

  const {
    start,
    bookingDuration,
    selectedBookableId,
  } = formData

  if (!selectedBookableId) {
    reject('Please select something to book.')
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
  return axios({
    method: 'post',
    url: `${baseUrl}booking`,
    data,
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((response) => {
      const newBooking = response.data
      resolve(newBooking)
    })
    .catch(() => {
      // TODO: If server passed error message, we could expose that to the user.
      reject(new Error('Something went wrong when trying to create the booking.'))
    })
})

export default createBooking
