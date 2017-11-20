const baseUrl = 'http://integration-bookit-api.buildit.tools/v1/'
const axios = require('axios')

axios(`${baseUrl}booking`)
  .then(bookings => Promise.all(bookings.data.map(b => (
    axios.delete(`${baseUrl}booking/${b.id}`)
  )))
    .then(result => console.log(result))
    .catch(err => console.error(err)))
