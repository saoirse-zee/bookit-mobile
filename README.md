# Bookit Mobile

![build status](https://concourse.buildit.tools/api/v1/teams/bookit-mobile/pipelines/bookit-mobile/badge "Build Status")

A booking app written in React Native.

## Getting started
Create a file called `config.js` in the project root. It should take the form of `config-sample.js`.

```
yarn  # Install dependencies
```

Run validations:
```
yarn test  # Lint the Javascript and run unit tests
yarn lint  # Run the linter alone
yarn test:unit  # Run the unit tests alone
yarn test:unit-watch  # Run the unit tests, and rerun on changes
```

## Expo
Build configuration is delegated to [Expo](https://expo.io/). Check their docs for complete info, but to get going, you can open the project in Expo's developer environment. This allows you to run the app on simulated devices (iOS and Android). You can also run the app in dev mode on your actual device, which gives you live reload, debugging, and other niceties.


## DB management scripts
Scripts to make development a little easier.

Delete all bookings. (Check the script and make sure you're pointing to the right server instance!)
```
node scripts/delete-all-bookings.js  
```

## Microsoft auth
The app uses Microsoft for authentication.

![Microsoft settings screenshot](./microsoft-settings.png)

To configure Bookit Mobile to work with your MS App:

1) Go to the configuration page for your MS app: https://apps.dev.microsoft.com/#/application/<your-app-id>

2) Add a "Native Application".

3) Add Bookit's OAuth redirect URI to the "Custom Redirect URIs" section.

4) Put the relevant MS app details in `config.js`. See `config-sample.js` for a guide on creating a valid `config.js`. (Or ask a friend!)
