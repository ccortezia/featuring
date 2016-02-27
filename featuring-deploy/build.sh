#!/bin/bash
set -e
set -u

readonly HERE=$(dirname $(readlink -f $0))
readonly ROOT=$HERE/..

function build_react_gui() {
  pushd $ROOT/featuring-react-gui > /dev/null
  rm -rf build
  npm install
  npm run dist
  popd > /dev/null
}

which npm
build_react_gui
