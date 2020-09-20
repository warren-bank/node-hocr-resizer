const help = `
hocr-resizer <options>

options:
========
"--help"
    Print a help message describing all command-line options.

"-v"
"--version"
    Display the version.

"-w" <integer>
"--width" <integer>
    [required] Width of new/resized image.

"-h" <integer>
"--height" <integer>
    [optional] Height of new/resized image.
    Default: calculated from old aspect ratio and new/resized width.

"-i" <filepath>
"--input" <filepath>
    [required] Filepath to input hOCR file.

"-o" <filepath>
"--output" <filepath>
    [optional] Filepath to output hOCR file.
    Default: overwrite input hOCR file.
`

module.exports = help
