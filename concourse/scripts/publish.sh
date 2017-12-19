#!/bin/bash

scriptpath=$(dirname "$(readlink -f "$0")")

main () {
	if [ -n "$RELEASE_CHANNEL" ]; then
		args+=(--release-channel "$RELEASE_CHANNEL")
	fi

	if [ -n "$CONFIG_FILE" ]; then
		args+=(--config "$CONFIG_FILE")
	fi

	apt-get update && apt-get install -y expect && \
	yarn global add exp && \
	"${scriptpath}"/helpers/login_exp.sh && \
	cd bookit-with-deps || exit 1
	exp publish "${args[@]}"
	local result=$?
	count=0
	while [ "$result" -gt 0 ] && [ "$count" -lt 20 ]; do
		echo "Build failed with code: $result, trying again in 60 seconds."
		sleep 60
		exp publish "${args[@]}"
		result=$?
		count=$((count+1))
	done
	exit "$result"
}

main
