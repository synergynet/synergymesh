@echo off
cd output

echo Deleting old build.
rmdir /s /q synergymesh

echo Creating new output/synergymesh folder.
md synergymesh

echo Copying in apps.
xcopy /i "../../apps" "synergymesh/apps" /e

echo Copying in common.
xcopy /i "../../common" "synergymesh/common" /e

echo Copying in lib.
xcopy /i "../../lib" "synergymesh/lib" /e

echo Copying in server.
xcopy /i "../../server" "synergymesh/server" /e

cd synergymesh

echo Deleting all .ts files.
del /S *.ts

echo Deleting all .js.map files.
del /S *.js.map

echo Deleting all .gitignore files.
del /S *.gitignore

cd ../..