@echo off
cd output

echo Deleting old build.
rmdir /s /q synergymesh-networking

echo Creating new output/synergymesh-networking folder.
md synergymesh-networking

echo Copying in config.
cd ../build_components
echo f | xcopy "config.json" "../output/synergymesh-site/config.json"

echo Copying in package.
echo f | xcopy "package.json" "../output/synergymesh-site/package.json"
cd ../output

echo Copying in common.
xcopy /i "../../../common" "synergymesh-networking/common" /e

echo Copying in crypto.
xcopy /i "../../../crypto" "synergymesh-networking/crypto" /e

echo Copying in lib.
xcopy /i "../../../lib" "synergymesh-networking/lib" /e

echo Copying in server.
xcopy /i "../../../server" "synergymesh-networking/server" /e

cd synergymesh-networking

echo Deleting all .ts files.
del /S *.ts

echo Deleting all .js.map files.
del /S *.js.map

echo Deleting all .gitignore files.
del /S *.gitignore

echo Deleting all server script files.
rmdir /S /Q "server/setup"
rmdir /S /Q "server/start"

cd ../..
