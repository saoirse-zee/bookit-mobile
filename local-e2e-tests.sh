#!/bin/bash

while getopts ":a" opt; do
  case $opt in
    a)
      skip_appium_check=true
      ;;
    \?)
      echo "Invalid option: -$OPTARG" >&2
      ;;
  esac
done

setup () {
  local current_time
  current_time=$(date +%s) && \
  local temp_config && \
  temp_config=$(jq --arg time "$current_time" '.nonce=$time' ./config.json) && \
	> ./config.json && \
	echo "$temp_config" >> ./config.json
}

teardown () {
  cd .. && \
  local temp_config && \
  temp_config=$(jq 'del(.nonce)' ./config.json) && \
	> ./config.json && \
	echo "$temp_config" >> ./config.json
}

check_appium_open () {
  if [ ! $skip_appium_check ]; then
    echo "Checking that appium is running on your machine"
    local appium
    appium=$(ps -eaf | grep -v grep | grep -i 'appium')
    if [ -z "$appium" ]; then
      tput setaf 1 && echo "[ FAIL ]"
      tput setaf 1 && echo 'Appium not running, if you are sure it is running, use the -a flag to override the check'
      exit 1
    fi
    tput setaf 2 && echo "[ OK ]"
  else
    tput setaf 2 && echo "Skipping appium check"
  fi
}

prepare_tests () {
	virtualenv workspace && \
	cd workspace && \
  rm -fr ./tests && \
	source bin/activate && \
	pip install pytest pytest-sugar arrow Appium-Python-Client && \
	cp -fr ../e2e ./tests
}

push_new_code () {
  if [ "$1" == 'PUSH' ]; then
    echo " I should be pushing "
    # setup && \
    # exp publish --config local-testing.json
  fi
}

main () {
  check_appium_open && \
  push_new_code "$1" && \
  prepare_tests && \
  py.test ./tests
  # teardown
}

main $1