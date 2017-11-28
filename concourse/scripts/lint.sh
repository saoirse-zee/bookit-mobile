#!/bin/bash

set -e -u -x

main () {
	cd bookit-with-deps && yarn lint
}

main
