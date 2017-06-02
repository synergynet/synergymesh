@echo off
cd output

echo Deleting old build.
rmdir /s /q SynergyMesh

echo Creating new output/SynergyMesh folder.
md SynergyMesh

echo Copying in apps.
xcopy /i "../../apps" "SynergyMesh/apps" /e

echo Copying in common.
xcopy /i "../../common" "SynergyMesh/common" /e

echo Copying in lib.
xcopy /i "../../lib" "SynergyMesh/lib" /e

echo Copying in server.
xcopy /i "../../server" "SynergyMesh/server" /e

cd SynergyMesh

echo Deleting all .ts files.
del /S *.ts

echo Deleting all .js.map files.
del /S *.js.map

echo Deleting all .gitignore files.
del /S *.gitignore

cd ../..