# Bookit Mobile

![build status](https://concourse.buildit.tools/api/v1/teams/bookit-mobile/pipelines/bookit-mobile/badge "Build Status")
[![coverage status](https://s3.amazonaws.com/bookit-mobile-artifacts/reports/badge.svg "Coverage Status")](http://bookit-mobile-artifacts.s3-website-us-east-1.amazonaws.com/reports/)


A booking app written in React Native. Click here to see our [CI Dashboard](http://bookit-mobile-artifacts.s3-website-us-east-1.amazonaws.com/).

## Getting started

Create a file called `config.json` in the project root. It should take the form of `config-sample.json`.

```bash
yarn  # Install dependencies
```

Run validations:

```bash
yarn test  # Lint the Javascript and run unit tests
yarn lint  # Run the linter alone
yarn test:unit  # Run the unit tests alone
yarn test:unit-watch  # Run the unit tests, and rerun on changes
```

## E2E Testing

In commit `35f4be7ee21bba4e1cadd6935ec18b85de343585` we decided to pull e2e testing from due to lack of support from expo.io. Some of the major issues we ran into when attemping to write e2e tests for this project.

* React Native compiles different components into one giant text wall so regex was needed to parse block texts like bookings - seems like there should be a better way but we never found it.
* React Native's Android modals cause Appium.io to completely lose it's connection to the app. This is obviously an Appium.io bug but native modals don't do this. Bug was already reported: https://github.com/appium/appium/issues/7806. This was a complete block along the Android thread.
* iOS tests pass about 80% of the time locally but every once in a while the tests fail for no apparent reason.
* iOS tests never passed on AWS's device farm. Check the bookit-mobile project for details. Could never get the app to even start up on Device Farm. No problems locally.
* Expo.io's android app does not handle OTA updates very gracefully. The app has to be opened and left open for an undetermined amount of time while the new code is downloaded then force-closed and reopened. There is no indicator for Appium to tell that new code has been downloaded so we settled on leaving it open for 30 seconds and checking that a nonce changed. Super awkward to code and even describe out loud.

In general, e2e testing is not a focus on the Expo.io platform. There is no documentation for it and only minimal posts on the forum for it (mostly people asking how to do it).


## Testing strategy
See [this doc](/docs/testing-strategy.md) for a detailed explanation of our testing strategy.

## Expo

Build configuration is delegated to [Expo](https://expo.io/). Check their docs for complete info, but to get going, you can open the project in Expo's developer environment. This allows you to run the app on simulated devices (iOS and Android). You can also run the app in dev mode on your actual device, which gives you live reload, debugging, and other niceties.

## DB management scripts

Scripts to make development a little easier.

Delete all bookings. (Check the script and make sure you're pointing to the right server instance!)

```bash
node scripts/delete-all-bookings.js
```

## Microsoft auth

The app uses Microsoft for authentication.

![Microsoft settings screenshot](./microsoft-settings.png)

To configure Bookit Mobile to work with your MS App:

1) Go to the configuration page for your MS app: https://apps.dev.microsoft.com/#/application/[your-app-id]

1) Add a "Native Application".

1) Add Bookit's OAuth redirect URI to the "Custom Redirect URIs" section.

1) Put the relevant MS app details in `config.json`. See `config-sample.json` for a guide on creating a valid `config.json`. (Or ask a friend!)
