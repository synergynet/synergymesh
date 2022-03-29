#!/bin/bash

git pull origin master
rsync -av ./* /var/www/synergy/
cd /var/www/synergy/
rm config.json
mv config.staging.json config.json
chmod -R www-data:www-data *
popd
