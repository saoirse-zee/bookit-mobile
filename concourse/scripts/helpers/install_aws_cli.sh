#!/bin/bash

apt-get update && \
apt-get install -y python-dev python-pip && \
pip install awscli --upgrade && \
mkdir ~/.aws/
cat <<EOT >> ~/.aws/config
[default]
aws_access_key_id = $AWS_ACCESS_KEY
aws_secret_access_key = $AWS_SECRET_KEY
region = $AWS_REGION
EOT