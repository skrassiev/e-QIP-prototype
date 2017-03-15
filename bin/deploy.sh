#! /bin/bash

set -e

API="https://api.fr.cloud.gov"
ORG="gsa-acq-eqip"
SPACE=$1

if [ $# -ne 1 ]; then
  echo "Usage: deploy <space>"
  exit
fi

if [ $SPACE = 'production' ]; then
  API_NAME="eqip-prototype-api"
  API_MANIFEST="manifest-api.yml"
  FRONTEND_NAME="eqip-prototype"
  FRONTEND_MANIFEST="manifest-frontend.yml"
  INTERACTIVE_LOGIN=0
elif [ $SPACE = 'staging' ]; then
  API_NAME="eqip-prototype-api-staging"
  API_MANIFEST="manifest-api-staging.yml"
  FRONTEND_NAME="eqip-prototype-staging"
  FRONTEND_MANIFEST="manifest-frontend-staging.yml"
  INTERACTIVE_LOGIN=0
elif [ $SPACE = 'dev' ]; then
  API_NAME="eqip-prototype-api-dev"
  API_MANIFEST="manifest-api-dev.yml"
  FRONTEND_NAME="eqip-prototype-dev"
  FRONTEND_MANIFEST="manifest-frontend-dev.yml"
  INTERACTIVE_LOGIN=1
else
  echo "Unknown space: $SPACE"
  exit
fi

# This directory is used to persist the CF credentials
mkdir -p $HOME/.cf

# This wonderful image pulls the `cf` tool along with the
# `autopilot` plugin
docker pull adelevie/cf-cli:latest

# For some reason, aliases aren't working here
# so we're using this function instead
cf_run() {
  docker run \
    -it \
    --rm \
    -v $HOME/.cf:/root/.cf \
    -v $PWD:/app \
    adelevie/cf-cli \
    cf "$@"
}

if [ $INTERACTIVE_LOGIN = 1 ]; then
  cf_run login \
    -a api.fr.cloud.gov \
    --sso \
    -s $SPACE \
    -o $ORG
else
  cf_run login \
    -a $API \
    -u $CF_USERNAME \
    -p $CF_PASSWORD \
    -o $ORG \
    -s $SPACE
fi

cf_run zero-downtime-push $API_NAME -f $API_MANIFEST
cf_run zero-downtime-push $FRONTEND_NAME -f $FRONTEND_MANIFEST
