#!/bin/bash

script_path=$(dirname "$(readlink -f "$0")")

main () {
  cd bookit-with-deps && \
  yarn test:unit
  rc=$?
  yarn badge-coverage && \
  "${script_path}"/helpers/install_aws_cli.sh && \
  aws s3 cp --recursive --quiet --acl public-read ./coverage s3://"$BUCKET"/reports && \
  "${script_path}"/helpers/update_unit_test_history.sh && \
  aws s3 cp --acl public-read unit-tests.json s3://bookit-mobile-artifacts/test-counts/unit-tests.json
  exit $rc
}

main
