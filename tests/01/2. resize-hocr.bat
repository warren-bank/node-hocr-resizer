@echo off

set DIR=%~dp0.
goto :start

:resize_hocr
  call node "%DIR%\..\..\bin\hocr-resizer.js" %*
  goto :eof

:start
call :resize_hocr -w "1280" -i "%DIR%\1-high-res\8087_054.3B.hocr" -o "%DIR%\2-low-res\8087_054.3B.hocr"
