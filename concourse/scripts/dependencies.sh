#!/bin/bash

set -e -u -x

mv dependency-cache/node_modules bookit-mobile && \
cd bookit-mobile && \
mv ./{.[!.],}* ../bookit-with-deps && \
cd ../bookit-with-deps && \
./concourse/scripts/helpers/build_config.sh
