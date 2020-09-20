#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

function resize_hocr {
  node "${DIR}/../../bin/hocr-resizer.js" "$@"
}

resize_hocr -w "1280" -i "${DIR}/1-high-res/8087_054.3B.hocr" -o "${DIR}/2-low-res/8087_054.3B.hocr"
