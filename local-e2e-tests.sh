#!/bin/bash

prepare_tests () {
	virtualenv workspace && \
	cd workspace && \
  rm -fr ./tests && \
	source bin/activate && \
	pip install pytest Appium-Python-Client && \
	cp -fr ../e2e ./tests
}

main () {
  echo "This assumes that appium is already running on your computer"
  exp publish --config local-testing.json && \
  prepare_tests && \
  py.test ./tests
}

main