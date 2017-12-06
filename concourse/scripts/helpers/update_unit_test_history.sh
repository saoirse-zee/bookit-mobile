#!/bin/bash

main () {
  curl -Lo /usr/bin/jq https://github.com/stedolan/jq/releases/download/jq-1.5/jq-linux64 && chmod +x /usr/bin/jq && \
  curl -Lo unit-tests.json "https://s3.amazonaws.com/bookit-mobile-artifacts/test-counts/unit-tests.json"
  total_tests=$(jq '.numTotalTests' ./jest.json)
  passing_tests=$(jq '.numPassedTests' ./jest.json)
  time=$(jq '.startTime' ./jest.json)
  jq ".labels += [$time] | .datasets[0].data += [$passing_tests] | .datasets[1].data += [$total_tests]" unit-tests.json >> unit-tests-temp.json
  mv unit-tests-temp.json unit-tests.json
}

main