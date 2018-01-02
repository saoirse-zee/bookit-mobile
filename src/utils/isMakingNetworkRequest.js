const isMakingNetworkRequest = (reduxState) => {
  const {
    locations,
    bookings,
    bookablesByLocation,
  } = reduxState

  // Shout out the developer if param is invalid
  if (
    !locations ||
    !bookings ||
    !bookablesByLocation
  ) {
    const invalidParamError = new Error('The params supplied to isMakingNetworkRequest is invalid. Make sure Redux state includes bookings, locations, and bookablesByLocation.')
    throw invalidParamError
  }

  // Handle the simple cases first
  if (
    locations.isFetching ||
    bookings.isFetching
  ) {
    return true
  }

  // Handle bookables, which is a more complex case
  const bookableLocations = Object.keys(bookablesByLocation)
  return bookableLocations.reduce((result, currentLocationId) => (
    bookablesByLocation[currentLocationId].isFetching ?
      true : result
  ), false)
}

export default isMakingNetworkRequest
