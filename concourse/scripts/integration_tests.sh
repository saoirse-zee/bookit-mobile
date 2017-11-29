#!/bin/bash

CONST_ANDROID="Android"
CONST_IOS="iOS"

set -e -x

do_setup () {
	local script_path
	script_path=$(dirname "$(readlink -f "$0")")
	"${script_path}"/helpers/install_aws_cli.sh && \
	apt-get -y install jq zip && \
	pip install virtualenv && \
	cd bookit-with-deps || exit
}

upload_binary () {
	if [ "$DEVICE" = "$CONST_ANDROID" ]; then
		local filename="android.apk"
		local type="ANDROID_APP"
	elif [ "$DEVICE" = "$CONST_IOS" ]; then
		local filename="ios.ipa"
		local type="IOS_APP"
	fi

	mkdir ./builds && \
	curl -Lo ./builds/$filename "$BINARY"
	bin=$(aws devicefarm create-upload --project-arn "$PROJECT_ARN" --name "$filename" --type "$type") && \
	binary_arn=$(echo "$bin" | jq -r '.upload.arn') && \
	local binary_url && \
	binary_url=$(echo "$bin" | jq -r '.upload.url') && \
	curl -T ./builds/$filename "$binary_url"
}


prepare_tests () {
	if [ "$DEVICE" = "$CONST_ANDROID" ]; then
		local test_folder="android"
	elif [ "$DEVICE" = "$CONST_IOS" ]; then
		local test_folder="ios"
	fi

	virtualenv workspace && \
	cd workspace && \
	source bin/activate && \
	pip install pytest Appium-Python-Client && \
	cp -fr ../e2e/$test_folder/tests ./tests && \
	py.test --collect-only tests/ && \
	pip freeze > requirements.txt && \
	pip wheel --wheel-dir wheelhouse -r requirements.txt && \
	zip -r test_bundle.zip tests/ wheelhouse/ requirements.txt && \
	local test_package && \
	test_package=$(aws devicefarm create-upload --project-arn "$PROJECT_ARN" --name test_bundle.zip --type APPIUM_PYTHON_TEST_PACKAGE) && \
	test_package_arn=$(echo "$test_package" | jq -r '.upload.arn') && \
	local test_package_url && \
	test_package_url=$(echo "$test_package" | jq -r '.upload.url') && \
	curl -T ./test_bundle.zip "$test_package_url"
}

run_tests () {
	local test_config="type=APPIUM_PYTHON,testPackageArn=$test_package_arn,parameters={}" && \
	local run && \
	run=$(aws devicefarm schedule-run --project-arn "$PROJECT_ARN" --app-arn "$binary_arn" --device-pool-arn "$DEVICE_POOL_ARN" --test "$test_config") && \
	run_arn=$(echo "$run" | jq -r '.run.arn')
}

wait_for_tests_to_finish () {
	local count=0
	result=$(aws devicefarm get-run --arn "$run_arn" | jq -r '.run.result')
	while [ "$result" = "PENDING" ] && [ $count -lt 20 ]; do  
		echo 'waiting for e2e tests to finish'
		sleep 60
		result=$(aws devicefarm get-run --arn "$run_arn" | jq -r '.run.result')
		count=$((count+1))
	done
}

main () {
	if [ "$DEVICE" != "$CONST_ANDROID" ] && [ "$DEVICE" != "$CONST_IOS" ]; then
		echo "Not configured to work with $DEVICE"
		exit 1
	fi
	do_setup && \
	upload_binary && \
	prepare_tests && \
	run_tests && \
	wait_for_tests_to_finish
	if [ "$result" != PASSED ]; then
		echo "Test result: $result"
		exit 1
	fi
	# Cleanup only happens if this passes
	aws devicefarm delete-run --arn "$run_arn"
	aws devicefarm delete-upload --arn "$test_package_arn"
	aws devicefarm delete-upload --arn "$binary_arn"
	exit 0
}

main

