#!/bin/bash

SCRIPTPATH=$(dirname "$(readlink -f "$0")")

apt-get update && apt-get install -y expect && \
yarn global add exp && \
"${SCRIPTPATH}"/helpers/login_exp.sh && \
cd bookit-with-deps && \
exp publish --release-channel "$RELEASE_CHANNEL"
