#!/bin/bash

main () {
  cd bookit-with-deps && \
  SHA=$(git rev-parse --short HEAD) && \
  yarn test:unit && \
  rc=$?
  yarn badge-coverage
  cd ..
  tar -zcf coverage/"$SHA".tar.gz ./bookit-with-deps/coverage
  exit $rc
}

main
