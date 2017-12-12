import moment from 'moment'

const isFormValid = (formData) => {
  const now = moment()
  const bookableIsSelected = !!(formData.selectedBookableId)
  const bookingIsInFuture = formData.start.isAfter(now)

  return bookableIsSelected && bookingIsInFuture
}

export default isFormValid
