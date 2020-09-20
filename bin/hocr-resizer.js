#! /usr/bin/env node

const argv_vals     = require('./hocr-resizer/process_argv')
const {resize_hocr} = require('../lib/process_cli')

try {
  resize_hocr(argv_vals)
  process.exit(0)
}
catch(e) {
  console.log(e.message)
  process.exit(1)
}
