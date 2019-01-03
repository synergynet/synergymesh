cd output

echo Deleting old build.
rm -rf synergymesh-networking

echo Creating new output/synergymesh folder.
mkdir synergymesh-networking

echo Copying in config.
cp "../build_components/config.json" "synergymesh-networking/config.json"

echo Copying in package.
cp "../build_components/package.json" "synergymesh-networking/package.json"

echo Copying in common.
cp -R "../../../common" "synergymesh-networking/"

echo Copying in crypto.
cp -R "../../../crypto" "synergymesh-networking/"

echo Copying in lib.
cp -R "../../../lib" "synergymesh-networking/"

echo Copying in server.
cp -R "../../../server" "synergymesh-networking/"

cd synergymesh-networking

echo Deleting all .ts files.
find . -name "*.ts" -type f -delete

echo Deleting all .js.map files.
find . -name "*.js.map" -type f -delete

echo Deleting all .gitignore files.
find . -name ".gitignore" -type f -delete

echo Deleting all server script files.
rm -rf "server/setup"
rm -rf "server/start"

cd ../..
