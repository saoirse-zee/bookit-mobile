#!/bin/bash

escaped_url=$(echo "$BOOKIT_API_BASE_URL" | sed 's#\([]\!\(\)\#\%\@\*\$\/&\-\=[]\)#\\\1#g')

main () {
	sed "s/<bookitApiBaseUrl>/$escaped_url/g" ./config-sample.js > ./config.js;
}

main
