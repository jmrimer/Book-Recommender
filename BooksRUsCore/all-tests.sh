#!/usr/bin/env bash

set -e

pushd ClientApp
npm run test-headless
npm run e2e 
popd



