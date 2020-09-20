### [hocr-resizer](https://github.com/warren-bank/node-hocr-resizer)

Command-line utility for resizing the coordinates in an hOCR (html-formatted ocr text) file.

#### Use Case:

* lets say that we've already done the following:
  - [tesseract](https://github.com/tesseract-ocr/tesseract) was used to generate [hOCR](https://en.wikipedia.org/wiki/HOCR) data from a set of high-resolution images
  - [hocr-pdf](https://github.com/ocropus/hocr-tools) was used to generate a [PDF](https://en.wikipedia.org/wiki/PDF) document that contains:
    * one visible image per page
    * ocr text in an invisible layer that makes the images searchable
* what if:
  - the size of the PDF is too big
* we can:
  - use [ImageMagick](https://imagemagick.org/index.php) to resize all images to a lower resolution
* the problem:
  - the coordinates in the hOCR files no-longer correspond to the dimensions of the images
    * the aspect ratio hasn't changed
    * the width and height of the images (in pixels) have decreased

#### Existing Solution:

* this problem has been discussed in an [issue in the hocr-tools repo](https://github.com/ocropus/hocr-tools/issues/39)
* as mentioned in an [issue comment](https://github.com/ocropus/hocr-tools/issues/39#issuecomment-249316429)
  - [hocr_resizer.rb](https://github.com/NCSU-Libraries/ocracoke/blob/master/app/processing_helpers/hocr_resizer.rb) is a Ruby script that can rescale the coordinates in a hOCR file
  - [hocr_resize.rake](https://github.com/NCSU-Libraries/ocracoke/blob/master/lib/tasks/hocr_resize.rake) is a Ruby rakefile to call the script

#### Reason for Yet-Another Solution:

* I fkn hate Ruby, and its enormous non-portable runtime
* ..why not?

#### Installation:

```bash
npm install --global @warren-bank/node-hocr-resizer
```

#### Usage:

```bash
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
```

#### Example:

* overwrite an hOCR with updated coordinates based on the same aspect ratio and a new image width of 1275px (ie: 150dpi @ 8.5"):
  ```bash
    hocr-resizer -w 1275 -i '/path/to/file.hocr'
  ```

#### Legal:

* copyright: [Warren Bank](https://github.com/warren-bank)
* license: [GPL-2.0](https://www.gnu.org/licenses/old-licenses/gpl-2.0.txt)
