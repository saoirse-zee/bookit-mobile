#!/bin/bash

main () {
	> ./config.json
	jq \
		'.bookitApiBaseUrl=env.BOOKIT_API_BASE_URL | .msAuthUrlOptions.clientId=env.MS_AUTH_CLIENT_ID | .msAuthUrlOptions.state=env.MS_AUTH_STATE' \
		./config-sample.json >> ./config.json
}

main
