#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

function resize_hocr {
  node "${DIR}/../../bin/hocr-resizer.js" "$@"
}

fname='8087_054.3B'
dst_dir="${DIR}/2-low-res"
[ -d "$dst_dir" ] || mkdir -p "$dst_dir"

# copy_high_res
src_hocr="${DIR}/../01/1-high-res/${fname}.hocr"
dst_hocr="${dst_dir}/${fname}.hocr"
cp "$src_hocr" "$dst_hocr"

# overwrite
resize_hocr -w '1280' -i "$dst_hocr"

# compare
good_hocr="${DIR}/../01/2-low-res/${fname}.hocr"
# assert that files are identical
cmp --silent "$dst_hocr" "$good_hocr" && echo 'SUCCESS: Files are identical' || echo 'WARNING: Files are different'
