# Our testing strategy

Our test strategy is based on Martin Fowler's [test pyramid](https://martinfowler.com/bliki/TestPyramid.html)

![test pyramid](https://martinfowler.com/bliki/images/testPyramid/test-pyramid.png)

Here is a brief guide to writing tests for various parts of Bookit Mobile:

## UI Tests

End to end tests (e.g. `e2e/ios/test_sampe_e2e_ios.py`)


## Service Tests

What would this be in our context?

## Unit Tests

For pure presentational components use Jest snapshots (e.g. `src/components/__tests__/ModalContent-test.js`)


For reducers, selectors, & utils use regular Jest assertions (e.g. [This test for filtering bookables](https://github.com/saoirse-zee/bookit-mobile/compare/filter-occupied-bookables#diff-c4fcf41ce2d396afb9b15fe53249da2e).)


For network requests, such as our `api` layer, mock external services with [Jest mocks](https://facebook.github.io/jest/docs/en/mock-functions.html). See also [Jest docs on testing asynchonrous code](https://facebook.github.io/jest/docs/en/asynchronous.html#content)
