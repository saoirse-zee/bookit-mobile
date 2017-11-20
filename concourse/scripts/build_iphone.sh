#!/bin/bash

echo "iPhone build placeholder"
# SCRIPTPATH=$(dirname "$(readlink -f "$0")")

# wait_until_previous_build_finishes () {
#   COUNT_PREVIOUS=0
#   PREVIOUS_STATUS=$(exp bs --config ./expo.integration.json | grep 'Android: ' | awk -F ": " '{print$2}')
#   while [ "$PREVIOUS_STATUS" = "Build in progress..." ] && [ $COUNT_PREVIOUS -lt 20 ]; do  
#     echo 'checking for the URL'
#     PREVIOUS_STATUS=$(exp bs --config ./expo.integration.json | grep 'Android: ' | awk -F ": " '{print$2}')
#     sleep 60
#     COUNT_PREVIOUS=$((COUNT_PREVIOUS+1))
#   done  
# }

# wait_until_build_finishes () {
#   COUNT_CURRENT=0

#   while [ -z "$ANDROID_APP_URL" ] && [ $COUNT_CURRENT -lt 20 ]; do  
#     echo 'checking for the URL'
#     ANDROID_APP_URL=$(exp bs --config ./expo.integration.json | grep 'APK:' | awk -F ": " '{print$2}')
#     sleep 60
#     COUNT_CURRENT=$((COUNT_CURRENT+1))
#   done  
# }

# apt-get update && apt-get install -y expect && \
# yarn global add exp && \
# "${SCRIPTPATH}"/login_exp.sh && \
# cd bookit-with-deps && \
# wait_until_previous_build_finishes && \
# exp ba --config ./expo.integration.json && \
# wait_until_build_finishes

# if [ -z "$ANDROID_APP_URL" ]; then
#   exit 1
# fi

# echo "APK URL:"
# exp bs --config ./expo.integration.json | grep 'APK:' | awk -F ": " '{print$2}'

