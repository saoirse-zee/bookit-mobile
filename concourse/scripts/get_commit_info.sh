#!/bin/sh

get_info () {
  cd "$FOLDER_NAME" || exit
  SHA=$(git rev-parse HEAD)
  SHORT_SHA=$(git rev-parse --short HEAD)
  MESSAGE=$(git show -s --format=%B "$SHA")
  COMMITTER=$(git show -s --format=%ce "$SHA")
  cd ..
}

create_attachment () {
  cat >./commit_info/attachments.json <<EOL
  [
    {
      "title": "Build $STATUS",
      "color": "$COLOR",
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
          "title": "Coverage Reports",
          "value": "<$REPORTS_URL|Reports>",
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
}

main () {
  get_info && \
  create_attachment && \
  cat ./commit_info/attachments.json
}

main

