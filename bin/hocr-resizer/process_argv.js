const process_argv = require('@warren-bank/node-process-argv')
const path         = require('path')

const argv_flags = {
  "--help":        {bool: true},
  "--version":     {bool: true},
  "--width":       {num:  "int"},
  "--height":      {num:  "int"},
  "--input":       {file: "text"},
  "--output":      {file: "path-dirname-exists"}
}

const argv_flag_aliases = {
  "--version":     ["-v"],
  "--width":       ["-w"],
  "--height":      ["-h"],
  "--input":       ["-i"],
  "--output":      ["-o"]
}

let argv_vals = {}

try {
  argv_vals = process_argv(argv_flags, argv_flag_aliases)
}
catch(e) {
  console.log('ERROR: ' + e.message)
  process.exit(1)
}

if (argv_vals["--help"]) {
  const help = require('./help')
  console.log(help)
  process.exit(0)
}

if (argv_vals["--version"]) {
  const data = require('../../package.json')
  console.log(data.version)
  process.exit(0)
}

if (!argv_vals["--width"] || (argv_vals["--width"] <= 0)) {
  console.log('ERROR: "width" is required')
  process.exit(1)
}

if (!argv_vals["--height"] || (argv_vals["--height"] <= 0)) {
  argv_vals["--height"] = 0
}

if (!argv_vals["--input"]) {
  console.log('ERROR: "input" is required')
  process.exit(1)
}

if (!argv_vals["--output"]) {
  const args = [...process.argv]
  let index  = -1

  if (index < 0)
    index = args.indexOf('--input')
  if (index < 0)
    index = args.indexOf('-i')

  if ((index >= 0) && (index <= (process.argv.length - 2))) {
    index++
    argv_vals["--output"] = path.resolve(process.argv[index])
  }
  else {
    // shouldn't be reachable..
    console.log('ERROR: "output" is required')
    process.exit(1)
  }
}

module.exports = argv_vals
