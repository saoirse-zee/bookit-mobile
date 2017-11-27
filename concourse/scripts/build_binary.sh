#!/bin/bash

SCRIPTPATH=$(dirname "$(readlink -f "$0")")

if [ "$BUILD_TARGET" = "iOS" ]; then
  BUILD_JSON="iOS.integration.json"
  BINARY_NAME="IPA";
  BUILD_COMMAND="bi";
elif [ "$BUILD_TARGET" = "Android" ]; then
  BUILD_JSON="android.integration.json"
  BINARY_NAME="APK";
  BUILD_COMMAND="ba";
fi;

wait_until_previous_build_finishes () {
  COUNT_PREVIOUS=0
  IS_BUILDING=$(exp bs --config ./"$BUILD_JSON" | grep 'Build in progress')
  while [ -n "$IS_BUILDING" ] && [ $COUNT_PREVIOUS -lt 20 ]; do
    echo 'Waiting for previous build to finish...'
    sleep 60
    IS_BUILDING=$(exp bs --config ./"$BUILD_JSON" | grep 'Build in progress')
    COUNT_PREVIOUS=$((COUNT_PREVIOUS+1))
  done
}

wait_until_build_finishes () {
  COUNT_CURRENT=0

  while [ -z "$APP_URL" ] && [ $COUNT_CURRENT -lt 20 ]; do
    echo "Checking if $BUILD_TARGET build finished..."
    APP_URL=$(exp bs --config ./"$BUILD_JSON" | grep "$BINARY_NAME" | awk -F ": " '{print$2}')
    sleep 60
    COUNT_CURRENT=$((COUNT_CURRENT+1))
  done
}

apt-get update && apt-get install -y expect && \
yarn global add exp && \
"${SCRIPTPATH}"/helpers/login_exp.sh && \
cd bookit-with-deps && \
wait_until_previous_build_finishes && \
exp "$BUILD_COMMAND" --config ./"$BUILD_JSON" && \
wait_until_build_finishes

if [ -z "$APP_URL" ]; then
  exit 1
fi

echo "BINARY_NAME URL: $APP_URL"
