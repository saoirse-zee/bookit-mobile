#!/bin/bash

main () {
	> ./config.json
	jq '.bookitApiBaseUrl=env.BOOKIT_API_BASE_URL' ./config-sample.json >> ./config.json
}

main
