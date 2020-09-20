#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# https://github.com/ocropus/hocr-tools
# https://github.com/ocropus/hocr-tools/blob/master/hocr-pdf

# https://github.com/ocropus/hocr-tools/blob/v1.3.0/hocr-pdf#L57
#   only recognizes .jpg images

fname='8087_054.3B'

# bad result:
input_image="${DIR}/2-low-res/${fname}.tif"
input_hocr="${DIR}/1-high-res/${fname}.hocr"
output_dir="${DIR}/3-low-res-pdf/1-hocr-unmodified"
temp_dir="${output_dir}/temp"
[ -d "$temp_dir" ] || mkdir -p "$temp_dir"
magick convert "$input_image" "${temp_dir}/${fname}.jpg"
cp "$input_hocr" "$temp_dir"
hocr-pdf "$temp_dir" >"${output_dir}/${fname}.pdf"
rm -rf "$temp_dir"

# good result:
input_image="${DIR}/2-low-res/${fname}.tif"
input_hocr="${DIR}/2-low-res/${fname}.hocr"
output_dir="${DIR}/3-low-res-pdf/2-hocr-resized"
temp_dir="${output_dir}/temp"
[ -d "$temp_dir" ] || mkdir -p "$temp_dir"
magick convert "$input_image" "${temp_dir}/${fname}.jpg"
cp "$input_hocr" "$temp_dir"
hocr-pdf "$temp_dir" >"${output_dir}/${fname}.pdf"
rm -rf "$temp_dir"
