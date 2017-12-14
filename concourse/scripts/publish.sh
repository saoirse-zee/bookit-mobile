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
	cd bookit-with-deps && \
	exp publish "${args[@]}"
}

main
