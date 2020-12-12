@echo off
if exist root rmdir /s /q root

md root 
cd root
call:create-html index.html
md images
cd images

set colors=white black red
for %%a in (%colors%) do (
  md %%a
  cd %%a
  call:create-html %%a.html

  for %%b in (%colors%) do (
    if NOT %%b==%%a call:create-svg %%b.svg %%a %%b
  )

  cd ..
)

cd ..

md deeply\tuck
cd deeply/tuck
call:create-html file.html
cd ../../..

goto :eof

:create-html 
echo ^<html^> > %1
echo   ^<body^> >> %1
echo     ^<table^> >> %1
call:create-row %1 "Черный квадрат на белом фоне"
call:create-row %1 "Черный квадрат на красном фоне"
call:create-row %1 "Белый квадрат на черном фоне"
call:create-row %1 "Белый квадрат на красном фоне"
call:create-row %1 "Красный квадрат на белом фоне"
call:create-row %1 "Красный квадрат на черном фоне"
echo     ^</table^> >> %1
echo   ^</body^> >> %1
echo ^</html^> >> %1
goto :eof

:create-row 
echo       ^<tr^> >> %1
echo         ^<td^>%~2^</td^> >> %1
echo         ^<td^>^<img src=''/^>^</td^> >> %1
echo       ^</tr^> >> %1
goto :eof

:create-svg
echo ^<svg width='40' height='40' viewBox='0 0 40 40' xmlns="http://www.w3.org/2000/svg"^> > %1
echo   ^<rect x='0' y='0' width='40' height='40' fill='%~2'/^> >> %1
echo   ^<rect x='10' y='10' width='20' height='20' fill='%~3'/^> >> %1
echo ^</svg^> >> %1
goto :eof