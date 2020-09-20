const fs = require('fs')

const get_old_dims = function(argv_vals){
  const regex_pattern = /ocr_page[^>]+bbox\s+0\s+0\s+(\d+)\s+(\d+)/
  const matches       = regex_pattern.exec(argv_vals["--input"])
  const dims          = {width: null, height: null}

  if (matches) {
    dims.width  = Number(matches[1])
    dims.height = Number(matches[2])
  }

  if (!dims.width || !dims.height) {
    throw new Error('ERROR: could not detect hOCR page dimensions')
  }

  return dims
}

const calc_height = function(argv_vals, old_dims){
  if (!argv_vals["--height"]) {
    // oh/ow = nh/nw
    // nh = (oh*nw)/ow
    argv_vals["--height"] = Math.floor((old_dims.height * argv_vals["--width"]) / old_dims.width)
  }
}

const update_coords = function(argv_vals, old_dims){
  const regex_pattern_1 = /bbox\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)/g
  const regex_pattern_2 = /baseline\s+(?:-?\d+)(?:\.\d+)?\s+(-?\d+)/g

  // nx/ox = nw/ow = xf
  // nx = xf*ox
  const x_factor = argv_vals["--width"] / old_dims.width

  // ny/oy = nh/oh = yf
  // ny = yf*oy
  const y_factor = argv_vals["--height"] / old_dims.height

  argv_vals["--input"] = argv_vals["--input"].replace(regex_pattern_1, (match, x0, y0, x1, y1) => {
    x0 = Math.floor(Number(x0) * x_factor)
    x1 = Math.floor(Number(x1) * x_factor)

    y0 = Math.floor(Number(y0) * y_factor)
    y1 = Math.floor(Number(y1) * y_factor)

    return `bbox ${x0} ${y0} ${x1} ${y1}`
  })

  argv_vals["--input"] = argv_vals["--input"].replace(regex_pattern_2, (match, y0) => {
    // https://github.com/tesseract-ocr/tessdoc/blob/master/FAQ-Old.md#how-to-interpret-hocr-baseline-output

    match = match.substring(0, (match.length - y0.length))
    y0 = Math.floor(Number(y0) * y_factor)

    return `${match}${y0}`
  })
}

const process_cli = function(argv_vals){
  const old_dims = get_old_dims(argv_vals)
  calc_height(argv_vals, old_dims)
  update_coords(argv_vals, old_dims)
  fs.writeFileSync(argv_vals["--output"], argv_vals["--input"], {encoding: 'utf8'})
}

module.exports = {resize_hocr: process_cli}
