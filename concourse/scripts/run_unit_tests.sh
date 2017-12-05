#!/bin/bash

main () {
  cd bookit-with-deps && \
  yarn test:unit && \
  rc=$?
  yarn badge-coverage && \
  ./helpers/install_aws_cli.sh && \
  aws s3 cp --recursive --quiet --acl public-read ./coverage "$BUCKET"/reports && \
  exit $rc
}

main
