cd output

echo Deleting old build.
rm -rf SynergyMesh

echo Creating new output/SynergyMesh folder.
mkdir SynergyMesh

echo Copying in apps.
cp -R "../../apps" "SynergyMesh/"

echo Copying in common.
cp -R "../../common" "SynergyMesh/"

echo Copying in lib.
cp -R "../../lib" "SynergyMesh/"

echo Copying in server.
cp -R "../../server" "SynergyMesh/"

cd SynergyMesh

echo Deleting all .ts files.
find . -name "*.ts" -type f -delete

echo Deleting all .js.map files.
find . -name "*.js.map" -type f -delete

echo Deleting all .gitignore files.
find . -name ".gitignore" -type f -delete

cd ../..
