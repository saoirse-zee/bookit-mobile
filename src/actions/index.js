const baseUrl = 'http://integration-bookit-api.buildit.tools/v1/'

const receiveLocations = json => ({
  type: 'RECEIVE_LOCATIONS',
  locations: json,
})

const receiveBookables = (locationId, json) => ({
  type: 'RECEIVE_BOOKABLES',
  locationId,
  bookables: json,
})

const receiveBookings = json => ({
  type: 'RECEIVE_BOOKINGS',
  bookings: json,
})

export const fetchLocations =
  () => dispatch => fetch(`${baseUrl}location/`)
    .then(response => response.json())
    .then(json => dispatch(receiveLocations(json)))

export const fetchBookables =
  locationId => dispatch => fetch(`${baseUrl}location/${locationId}/bookable`)
    .then(response => response.json())
    .then(json => dispatch(receiveBookables(locationId, json)))

export const fetchBookings =
  () => dispatch => fetch(`${baseUrl}booking`)
    .then(response => response.json())
    .then(json => dispatch(receiveBookings(json)))
