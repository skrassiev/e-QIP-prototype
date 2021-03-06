#! /bin/bash

set -e

API="https://api.fr.cloud.gov"
ORG="gsa-acq-eqip"
SPACE=$1

if [ $# -ne 1 ]; then
  echo "Usage: deploy <space>"
  exit
fi

./bin/predeploy.sh $SPACE

# Use CircleCI's ENV variables
# TODO: Remove CIRCLE vars and use "staging" space if/when we're in one repo; else when Circle implements `owner` as a job filter.
if [ "$SPACE" = "production" ] && [ "$CIRCLE_PROJECT_USERNAME" = "18F" ]; then
  API_NAME="eqip-prototype-api"
  API_MANIFEST="manifest-api.yml"
  FRONTEND_NAME="eqip-prototype"
  FRONTEND_MANIFEST="manifest-frontend.yml"
elif [ "$SPACE" = "production" ] && [ "$CIRCLE_PROJECT_USERNAME" = "truetandem" ]; then
  SPACE="staging"
  API_NAME="eqip-prototype-api-staging"
  API_MANIFEST="manifest-api-staging.yml"
  FRONTEND_NAME="eqip-prototype-staging"
  FRONTEND_MANIFEST="manifest-frontend-staging.yml"
elif [ $SPACE = 'dev' ]; then
  API_NAME="eqip-prototype-api-dev"
  API_MANIFEST="manifest-api-dev.yml"
  FRONTEND_NAME="eqip-prototype-dev"
  FRONTEND_MANIFEST="manifest-frontend-dev.yml"

  CF_USERNAME=$CF_USERNAME_DEV
  CF_PASSWORD=$CF_PASSWORD_DEV
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
    --rm \
    -v $HOME/.cf:/root/.cf \
    -v $PWD:/app \
    adelevie/cf-cli \
    cf "$@"
}

cf_run login -a $API -u $CF_USERNAME -p $CF_PASSWORD -o $ORG -s $SPACE
cf_run zero-downtime-push $API_NAME -f $API_MANIFEST
cf_run zero-downtime-push $FRONTEND_NAME -f $FRONTEND_MANIFEST
