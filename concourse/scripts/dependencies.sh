#!/bin/bash

main () {
  add-apt-repository ppa:eugenesan/ppa && apt-get update && apt-get install -y jq && \
  mv dependency-cache/node_modules bookit-mobile && \
  cd bookit-mobile && \
  mv ./{.[!.],}* ../bookit-with-deps && \
  cd ../bookit-with-deps && \
  ./concourse/scripts/helpers/build_config.sh
}

main

