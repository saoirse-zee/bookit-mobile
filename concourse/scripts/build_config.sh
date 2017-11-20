#!/bin/bash
ESCAPED_URL=$(echo "$BOOKIT_API_BASE_URL" | sed 's#\([]\!\(\)\#\%\@\*\$\/&\-\=[]\)#\\\1#g')

sed "s/<bookitApiBaseUrl>/$ESCAPED_URL/g" ./config-sample.js > ./config.js;