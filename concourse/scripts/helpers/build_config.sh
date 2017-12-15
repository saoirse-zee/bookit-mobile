#!/bin/bash

main () {
	> ./config.json
	jq \
		'.authRedirectUrl=env.MS_AUTH_REDIRECT_URL | .bookitApiBaseUrl=env.BOOKIT_API_BASE_URL | .msAuthUrlOptions.clientId=env.MS_AUTH_CLIENT_ID | .msAuthUrlOptions.state=env.MS_AUTH_STATE' \
		./config-sample.json >> ./config.json
		cat ./config.json
}

main
