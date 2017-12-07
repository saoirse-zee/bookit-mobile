#!/bin/bash

main () {
  curl -Lo /usr/bin/jq https://github.com/stedolan/jq/releases/download/jq-1.5/jq-linux64 && chmod +x /usr/bin/jq && \
  curl -Lo unit-tests.json "https://s3.amazonaws.com/bookit-mobile-artifacts/test-counts/unit-tests.json"
  percent=$(printf "%0.2f\n" "$(npm run percent-covered -s)") #yarn stupidly has no way to run without logging
  time=$(date +%s000)
  jq ".labels += [$time] | .datasets[0].data += [$percent]" unit-tests.json >> unit-tests-temp.json
  mv unit-tests-temp.json unit-tests.json
}

main