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
  exp publish --config integration.json
  prepare_tests
  py.test ./tests
}

main