#!/bin/bash

set -x;

SCRIPTPATH=$(dirname "$(readlink -f "$0")")

EXTRAS=""
if [ -n "$RELEASE_CHANNEL" ]; then
  EXTRAS="$EXTRAS --release-channel $RELEASE_CHANNEL"
fi

if [ -n "$CONFIG_FILE" ]; then
  EXTRAS="$EXTRAS --config $CONFIG_FILE"
fi

apt-get update && apt-get install -y expect && \
yarn global add exp && \
"${SCRIPTPATH}"/helpers/login_exp.sh && \
cd bookit-with-deps && \
ls -la && \
exp publish "$EXTRAS"
