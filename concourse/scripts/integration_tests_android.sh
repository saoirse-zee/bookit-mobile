#!/bin/bash

SCRIPTPATH=$(dirname "$(readlink -f "$0")")

wait_for_tests_to_finish () {
  COUNT=0
  RESULT=$(aws devicefarm get-run --arn "$RUN_ARN" | jq -r '.run.result')
  while [ "$RESULT" = "PENDING" ] && [ $COUNT -lt 20 ]; do  
    echo 'waiting for e2e tests to finish'
    RESULT=$(aws devicefarm get-run --arn "$RUN_ARN" | jq -r '.run.result')
    sleep 60
    COUNT=$((COUNT+1))
  done
}

# Prep Work
"${SCRIPTPATH}"/helpers/install_aws_cli.sh && \
apt-get install jq && \
pip install virtualenv && \
cd bookit-with-deps && \

# upload the android APK
mkdir ./builds && \
LATEST_UPLOAD=$(exp bs --config ./expo.integration.json | grep 'APK:' | awk -F ": " '{print$2}') && \
curl -L -o ./builds/android.apk "$LATEST_UPLOAD" && \
APK=$(aws devicefarm create-upload --project-arn "$PROJECT_ARN" --name android.apk --type ANDROID_APP) && \
APK_ARN=$(echo "$APK" | jq -r '.upload.arn') && \
APK_URL=$(echo "$APK" | jq -r '.upload.url') && \
curl -T ./builds/android.apk "$APK_URL" && \

# prepare and upload the tests
virtualenv workspace && \
cd workspace && \
source bin/activate && \
pip install pytest Appium-Python-Client && \
cp -fr ../e2e/tests ./tests && \
py.test --collect-only tests/ && \
pip freeze > requirements.txt && \
pip wheel --wheel-dir wheelhouse -r requirements.txt && \
zip -r test_bundle.zip tests/ wheelhouse/ requirements.txt && \
TEST=$(aws devicefarm create-upload --project-arn "$PROJECT_ARN" --name test_bundle.zip --type APPIUM_PYTHON_TEST_PACKAGE) && \
TEST_ARN=$(echo "$TEST" | jq -r '.upload.arn') && \
TEST_URL=$(echo "$TEST" | jq -r '.upload.url') && \
curl -T ./test_bundle.zip "$TEST_URL" && \

# Run the tests and wait for completion
TEST_CONFIG="type=APPIUM_PYTHON,testPackageArn=$TEST_ARN,parameters={}" && \
RUN=$(aws devicefarm schedule-run --project-arn "$PROJECT_ARN" --app-arn "$APK_ARN" --device-pool-arn "$DEVICE_POOL_ARN" --test "$TEST_CONFIG") && \
RUN_ARN=$(echo "$RUN" | jq -r '.run.arn') && \
wait_for_tests_to_finish
if [ "$RESULT" != PASSED ]; then
  echo "Test result: $RESULT"
  exit 1
fi
# Cleanup only happens if this passes
aws devicefarm delete-run --arn "$RUN_ARN"
aws devicefarm delete-upload --arn "$TEST_ARN"
aws devicefarm delete-upload --arn "$APK_ARN"
exit 0