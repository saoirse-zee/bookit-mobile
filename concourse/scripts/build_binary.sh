#!/bin/bash

# No longer used but kept around as a good reference in we want to build a new expo shell in the future

script_path=$(dirname "$(readlink -f "$0")")

if [ "$BUILD_TARGET" = "iOS" ]; then
	build_json="iOS.integration.json"
	binary_name="IPA";
	build_command="bi";
elif [ "$BUILD_TARGET" = "Android" ]; then
	build_json="android.integration.json"
	binary_name="APK";
	build_command="ba";
fi;

wait_until_previous_build_finishes () {
	local count=0
	local is_building
	is_building=$(exp bs --config ./"$build_json" | grep 'Build in progress')
	while [ -n "$is_building" ] && [ $count -lt 20 ]; do
		echo 'Waiting for previous build to finish...'
		sleep 60
		is_building=$(exp bs --config ./"$build_json" | grep 'Build in progress')
		count=$((count+1))
	done
}

wait_until_build_finishes () {
	local count=0

	while [ -z "$app_url" ] && [ $count -lt 20 ]; do
		echo "Checking if $BUILD_TARGET build finished..."
		app_url=$(exp bs --config ./"$build_json" | grep "$binary_name" | awk -F ": " '{print$2}')
		sleep 60
		count=$((count+1))
	done
}

main () {
	apt-get update && apt-get install -y expect && \
	yarn global add exp && \
	"${script_path}"/helpers/login_exp.sh && \
	cd bookit-with-deps && \
	wait_until_previous_build_finishes && \
	exp "$build_command" --config ./"$build_json" && \
	wait_until_build_finishes

	if [ -z "$app_url" ]; then
		exit 1
	fi

  echo "binary_name URL: $app_url"
}

main

