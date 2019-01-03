cd output

echo Deleting old build.
rm -rf synergymesh-site

echo Creating new output/synergymesh-site folder.
mkdir synergymesh-site

echo Copying in config.
cp "../build_components/config.json" "synergymesh-site/config.json"

echo Copying in package.
cp "../build_components/package.json" "synergymesh-site/package.json"

echo Copying in apps.
cp -R "../../../apps" "synergymesh-site/"

echo Copying in common.
cp -R "../../../common" "synergymesh-site/"

echo Copying in crypto.
cp -R "../../../crypto" "synergymesh-site/"

echo Copying in lib.
cp -R "../../../lib" "synergymesh-site/"

echo Copying in server.
cp -R "../../../server" "synergymesh-site/"

echo Copying in index page.
cp "../../../index.html" "synergymesh-site/"

cd synergymesh-site

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
