#!/bin/bash
BUILD_JSON="expo.staging.json"
SCRIPTPATH=$(dirname "$(readlink -f "$0")")

wait_until_previous_build_finishes () {
  COUNT_PREVIOUS=0
  ANDROID_PREVIOUS_STATUS=$(exp bs --config ./"$BUILD_JSON" | grep 'Android: ' | awk -F ": " '{print$2}')
  # IPHONE_PREVIOUS_STATUS=$(exp bs --config ./"$BUILD_JSON" | grep 'Apple: ' | awk -F ": " '{print$2}')
  # while [ "$ANDROID_PREVIOUS_STATUS" = "Build in progress..." ] && [ "$IPHONE_PREVIOUS_STATUS" = "Build in progress..." ] && [ $COUNT_PREVIOUS -lt 20 ]; do  
  while [ "$ANDROID_PREVIOUS_STATUS" = "Build in progress..." ] && [ $COUNT_PREVIOUS -lt 20 ]; do  
    echo 'checking for the URL'
    ANDROID_PREVIOUS_STATUS=$(exp bs --config ./"$BUILD_JSON" | grep 'Android: ' | awk -F ": " '{print$2}')
    # IPHONE_PREVIOUS_STATUS=$(exp bs --config ./"$BUILD_JSON" | grep 'Apple: ' | awk -F ": " '{print$2}')
    sleep 60
    COUNT_PREVIOUS=$((COUNT_PREVIOUS+1))
  done  
}

wait_until_build_finishes () {
  COUNT_CURRENT=0

  # while [ -z "$ANDROID_APP_URL" ] && [ -z "$IPHONE_APP_URL" ] && [ $COUNT_CURRENT -lt 20 ]; do
  while [ -z "$ANDROID_APP_URL" ] && [ $COUNT_CURRENT -lt 20 ]; do
    echo 'checking for the URL'
    # IPHONE_APP_URL=$(exp bi --config ./"$BUILD_JSON" | grep 'IPA:' | awk -F ": " '{print$2}')
    ANDROID_APP_URL=$(exp bs --config ./"$BUILD_JSON" | grep 'APK:' | awk -F ": " '{print$2}')
    sleep 60
    COUNT_CURRENT=$((COUNT_CURRENT+1))
  done  
}

apt-get update && apt-get install -y expect && \
yarn global add exp && \
"${SCRIPTPATH}"/helpers/login_exp.sh && \
cd bookit-with-deps && \
wait_until_previous_build_finishes && \
exp ba --config ./"$BUILD_JSON" && \
# exp bi --config ./"$BUILD_JSON" && \
wait_until_build_finishes

if [ -z "$ANDROID_APP_URL" ]; then
  exit 1
fi

echo "APK URL:"
exp bs --config ./"$BUILD_JSON" | grep 'APK:' | awk -F ": " '{print$2}'

