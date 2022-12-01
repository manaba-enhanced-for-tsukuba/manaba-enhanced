#!/usr/bin/env bash

set -e

version=$(jq -r '.version' package.json)

if [[ -z "$version" ]]; then
  echo 'Fatal: Could not retrieve version from package.json.' 1>&2
  exit 1
fi

xpi_file=$(realpath "web-ext-artifacts/manaba_enhanced_for_tsukuba-$version.xpi")

if [[ ! -f "$xpi_file" ]]; then
  echo "Fatal: xpi file for version $version not found." 1>&2
  exit 1
fi

cd dist-firefox

./bin/publishVersion.sh "$version" "$xpi_file"
