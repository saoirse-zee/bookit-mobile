#!/bin/bash

set -e -u -x

mv dependency-cache/node_modules bookit-prototype-3 && \
cd bookit-prototype-3 && \
mv ./{.[!.],}* ../bookit-with-deps && \
cd ../bookit-with-deps && \
./concourse/scripts/build_config.sh
