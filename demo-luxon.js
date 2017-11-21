const luxon = require('luxon')

const { DateTime } = luxon

// Get from server. Set to bookable's time zone, like this. Put in Redux store.
// const s = DateTime.fromISO('2017-11-17T01:35', { zone: 'America/New_York'})
// console.log(s.toLocaleString());
// console.log(s.zoneName);
// console.log(s.offset / 60);
// If needed, you can change the timezone when before display, like this:
// const nyc = s.setZone('Europe/Paris')
// console.log(nyc.toLocaleString({
//   hour: 'numeric',
//   minute: '2-digit',
//   timeZoneName: 'long',
// }));

// const dt = DateTime.fromISO('2017-11-17T01:35', { zone: 'America/New_York'})
// console.log(dt.toLocaleString({
//   hour: 'numeric',
//   minute: '2-digit',
//   timeZoneName: 'short',
// }));
//
// const jsDate = dt.toJSDate()
// console.log(jsDate);
//
// const newDtFromJsDate = DateTime.fromJSDate(jsDate)
// console.log(newDtFromJsDate.toString());
//
// console.log(dt.diff(newDtFromJsDate).toObject())

// const now = DateTime.local()
// const later = now.plus({ 'days': 3 })
// console.log(now < later)
