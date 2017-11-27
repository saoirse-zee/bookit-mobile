#!/bin/bash

BUILD_JSON="expo.integration.json"
SCRIPTPATH=$(dirname "$(readlink -f "$0")")

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

  while [ -z "$IOS_APP_URL" ] && [ $COUNT_CURRENT -lt 20 ]; do
    echo 'Checking if iOS build finished...'
    IOS_APP_URL=$(exp bs --config ./"$BUILD_JSON" | grep 'IPA:' | awk -F ": " '{print$2}')
    sleep 60
    COUNT_CURRENT=$((COUNT_CURRENT+1))
  done
}

apt-get update && apt-get install -y expect && \
yarn global add exp && \
"${SCRIPTPATH}"/helpers/login_exp.sh && \
cd bookit-with-deps && \
wait_until_previous_build_finishes && \
exp bi --config ./"$BUILD_JSON" && \
wait_until_build_finishes

if [ -z "$IOS_APP_URL" ]; then
  exit 1
fi

echo "IPA URL:"
exp bs --config ./"$BUILD_JSON" | grep 'IPA:' | awk -F ": " '{print$2}'
