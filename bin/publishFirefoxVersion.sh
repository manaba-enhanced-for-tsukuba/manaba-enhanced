#!/usr/bin/env bash

version=$(jq -r '.version' package.json)

if [[ -z "$version" ]]; then
  echo 'Fatal: Could not retrieve version from package.json.' 1>&2
  exit 1
fi

xpi_file="manaba_enhanced_for_tsukuba-$version.xpi"

if [[ ! -f "web-ext-artifacts/$xpi_file" ]]; then
  echo "Fatal: xpi file for version $version not found." 1>&2
  exit 1
fi

existing_release=$(jq -r --arg version \
  "$version" '.addons."{9FD229B7-1BD6-4095-965E-BE30EBFAD42E}".updates[] | select(.version == $version) | .version' \
  dist-firefox/updates.json)
if [[ "$existing_release" ]]; then
  echo "Version $version is already published."
  exit 0
fi

mkdir -p dist-firefox/versions
cp "web-ext-artifacts/$xpi_file" dist-firefox/versions

cd dist-firefox || exit 1

jq --arg version "$version" --arg xpi_file "https://raw.githubusercontent.com/mkobayashime/manaba-enhanced-dist-firefox/main/versions/$xpi_file" \
  '.addons."{9FD229B7-1BD6-4095-965E-BE30EBFAD42E}".updates += [
    {
      "version": $version,
      "update_link": $xpi_file
    }
  ]' \
  updates.json > updated.json
mv updated.json updates.json

./bin/updateReadme.sh "$version"

git add -N .

if ! git diff --exit-code; then
  git add .
  git commit -m "Release"
  git pull origin main
  git push origin main
fi
