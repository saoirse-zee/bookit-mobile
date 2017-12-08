#!/bin/bash

CONST_HISTORY_MAX_COUNT=30

append_datapoint () {
  local epoch_time=$1
  local percent=$2
  local count
  count=$(jq '.labels | length' unit-tests.json)
  if [ "$count" -gt "$(($CONST_HISTORY_MAX_COUNT - 1))" ]; then
    jq " \
      del(.labels[0]) | \
      del(.datasets[0].data[0]) | \
      .labels += [$epoch_time] | \
      .datasets[0].data += [$percent]
    " unit-tests.json >> unit-tests-temp.json
  else
    jq " \
      .labels += [$epoch_time] | \
      .datasets[0].data += [$percent]
    " unit-tests.json >> unit-tests-temp.json
  fi
}

main () {
  curl -Lo /usr/bin/jq https://github.com/stedolan/jq/releases/download/jq-1.5/jq-linux64 && chmod +x /usr/bin/jq && \
  curl -Lo unit-tests.json "https://s3.amazonaws.com/bookit-mobile-artifacts/test-counts/unit-tests.json"
  local percent
  percent=$(printf "%0.2f\n" "$(npm run percent-covered -s)") #yarn stupidly has no way to run without logging
  local epoch_time
  epoch_time=$(date +%s000) #charting library wants this in milli, not seconds
  append_datapoint "$epoch_time" "$percent" && \
  mv unit-tests-temp.json unit-tests.json
}

main