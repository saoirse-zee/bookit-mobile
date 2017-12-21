# Our testing strategy

We have several types of code in this project -- presentational React components, pure Redux functions, functions with side effects, and so forth. This guide is intended to help future developers by pointing to existing patterns for writing tests for each of these cases.



## End to end tests

These tests run through a common user journey such as Log in > Book a room > See the booked room in the list of bookings.

These are the only tests that build and run the app. They connect to the integration version of Bookit API. We run these tests on at least one version each of Android and iPhone. They are written in Python. This might seem odd, but it is a requirement of AWS's Device Farm, which we use in the continuous integration pipeline.

Example: `e2e/ios/test_ios_booking_thread.py`



## Functional Tests & Unit Tests

### Presentational React components
Write tests for pure presentational components using Jest snapshots.

Example: `src/components/__tests__/ModalContent-test.js`


### Pure functions
For ordinary pure functions (this includes most reducers, selectors, and utils) use regular Jest assertions.

Example: `src/utils/__tests__/userHasLoggedIn.js`


### Function with side effects
Use Jest mocks for functions that have side effects, such as dispatching actions. You can then inspect the behavior of the mocks to make sure the side effect happened as expected.

Example: `src/utils/__tests__/handleError-test.js`


### Testing for thrown errors
Sometimes we throw our own errors. We test them by wrapping them in a dummy function, then looking for the error thrown by the dummy.

Example: `src/utils/isMakingNetworkRequest-test.js`


### Functions that call external APIs
We also use Jest mocks when testing functions that make use of external services. For example, the tests for our `api` layer use a mocked version of the `axios` library. Instead of calling bookit api, the mock returns a predefined response. This allows us to focus on testing the behavior of our code itself without worrying about the behavior of the external api. Note that the library mock is kept as simple as possible. We are not trying to reproduce the full behavior of `axios` or Bookit API.

See [Jest docs on mocks.](https://facebook.github.io/jest/docs/en/mock-functions.html)

Example of a mocked library: `src/api/__mocks__/axios.js`
And a test that uses it: `src/api/__tests__/fetchBookings.js`


### Asynchronous functions
Jest has several varieties of syntax for testing asynchonrous code. We've chosen to use the `resolves.toEqual` variety, at least for now.

[See Jest docs on async code.](https://facebook.github.io/jest/docs/en/asynchronous.html#content)

Example: `src/api/__tests__/fetchBookings.js`


### Functions that use globals
Use mocks for testing code that relies on global state. Globals may not be present, or predictable, in the context of the test runner. You can mock out globals in the same way that you mock out external services.

Example of mocked globals: `src/utils/__mocks__/expo.js`
And a test that uses it: `src/utils/__tests__/isTestMode.js`
