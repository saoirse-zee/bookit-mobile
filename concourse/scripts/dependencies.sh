#!/bin/bash

main () {
  curl -Lo /usr/bin/jq https://github.com/stedolan/jq/releases/download/jq-1.5/jq-linux64
  mv dependency-cache/node_modules bookit-mobile && \
  cd bookit-mobile && \
  mv ./{.[!.],}* ../bookit-with-deps && \
  cd ../bookit-with-deps && \
  ./concourse/scripts/helpers/build_config.sh
}

main

