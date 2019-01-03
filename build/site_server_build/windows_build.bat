@echo off
cd output

echo Deleting old build.
rmdir /s /q synergymesh-site

echo Creating new output/synergymesh-site folder.
md synergymesh-site

echo Copying in config.
cd ../build_components
echo f | xcopy "config.json" "../output/synergymesh-site/config.json"

echo Copying in package.
echo f | xcopy "package.json" "../output/synergymesh-site/package.json"
cd ../output

echo Copying in apps.
xcopy /i "../../../apps" "synergymesh-site/apps" /e

echo Copying in common.
xcopy /i "../../../common" "synergymesh-site/common" /e

echo Copying in crypto.
xcopy /i "../../../crypto" "synergymesh-site/crypto" /e

echo Copying in lib.
xcopy /i "../../../lib" "synergymesh-site/lib" /e

echo Copying in server.
xcopy /i "../../../server" "synergymesh-site/server" /e

echo Copying in index page.
cd ../../../
echo f | xcopy "index.html" "build/site_server_build/output/synergymesh-site/index.html"

cd build/site_server_build/output/synergymesh-site

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
