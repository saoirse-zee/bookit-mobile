#!/bin/sh

# Get info
apt-get install -y git
cd bookit-mobile || exit

SHA=$(git rev-parse HEAD)
SHORT_SHA=$(git rev-parse --short HEAD)
MESSAGE=$(git show -s --format=%B "$SHA")
COMMITTER=$(git show -s --format=%ce "$SHA")
cd ..

# Create attachment
cat >./commit_info/attachments.json <<EOL
[
  {
    "title": "Build $STATUS",
    "color": "$COLOR,
    "fields": [
      {
        "title": "Branch",
        "value": "$BRANCH",
        "short": true
      },
      {
        "title": "Commit",
        "value": "<$GIT_COMMIT_URL$SHA|$SHORT_SHA>",
        "short": true
      },
      {
        "title": "Committer",
        "value": "$COMMITTER",
        "short": true
      },
      {
        "title": "Commit Message",
        "value": "$MESSAGE",
        "short": false
      }
    ]
  }
]
EOL