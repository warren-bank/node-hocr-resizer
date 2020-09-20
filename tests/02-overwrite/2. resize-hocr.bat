@echo off

set DIR=%~dp0.
goto :start

:resize_hocr
  call node "%DIR%\..\..\bin\hocr-resizer.js" %*
  goto :eof

:start
set fname=8087_054.3B
set dst_dir=%DIR%\2-low-res
if not exist "%dst_dir%" mkdir "%dst_dir%"

:copy_high_res
set src_hocr=%DIR%\..\01\1-high-res\%fname%.hocr
set dst_hocr=%dst_dir%\%fname%.hocr
copy "%src_hocr%" "%dst_hocr%"

:overwrite
call :resize_hocr -w "1280" -i "%dst_hocr%"

:compare
set good_hocr=%DIR%\..\01\2-low-res\%fname%.hocr
rem :: assert that files are identical
fc /B "%dst_hocr%" "%good_hocr%"
