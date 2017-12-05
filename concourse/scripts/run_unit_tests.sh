#!/bin/bash

main () {
  cd bookit-with-deps && \
  yarn test:unit && \
  rc=$?
  yarn badge-coverage
  cd ..
  tar -zcf coverage/coverage.tar.gz ./bookit-with-deps/coverage
  exit $rc
}

main
