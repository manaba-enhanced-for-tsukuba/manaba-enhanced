#!/usr/bin/env bash

set -eu

version=$(grep version package.json | sed 's/\s*"version": "//g; s/",//g')

tmpfile=$(mktemp)
echo "$version" > "$tmpfile"
$EDITOR "$tmpfile"

newVersion=$(head -n 1 "$tmpfile")

sed -i "s/$version/$newVersion/g" package.json public/manifest.json

rm "$tmpfile"
