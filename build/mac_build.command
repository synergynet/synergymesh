cd output

echo Deleting old build.
rm -rf synergymesh

echo Creating new output/synergymesh folder.
mkdir synergymesh

echo Copying in apps.
cp -R "../../apps" "synergymesh/"

echo Copying in common.
cp -R "../../common" "synergymesh/"

echo Copying in lib.
cp -R "../../lib" "synergymesh/"

echo Copying in server.
cp -R "../../server" "synergymesh/"

cd synergymesh

echo Deleting all .ts files.
find . -name "*.ts" -type f -delete

echo Deleting all .js.map files.
find . -name "*.js.map" -type f -delete

echo Deleting all .gitignore files.
find . -name ".gitignore" -type f -delete

cd ../..
