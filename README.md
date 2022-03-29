# SynergyMesh

A library for supporting web-based multi-user apps for natural user interfaces. The library supports many features which can be made use of by apps implemented with it, such as: multi-touch gesture support and networking.

 - [Using SynergyMesh](https://github.com/jamcnaughton/synergymesh/wiki/using-synergymesh)
 - [Developing with SynergyMesh](https://github.com/jamcnaughton/synergymesh/wiki/developing-with-synergymesh)

# Set up

To be publicly available, the app needs two virtual hosts. One for the socket server, and one for the front-end application.

```
<VirtualHost *:8080>
        ServerAdmin webmaster@localhost
        ServerName synergy-dev.red-robot-dev.co.uk
        ProxyPass / http://localhost:8888/
        ProxyPassReverse / http://localhost:8888/
</VirtualHost>
```

```
<VirtualHost *:8080>
        ServerAdmin webmaster@localhost
        ServerName synergy-server.red-robot-dev.co.uk
        ProxyPass / http://localhost:8999/
        ProxyPassReverse / http://localhost:8999/
</VirtualHost>
```

# Starting the apps

The front-end should run on the port specified in the vhost (8888 if using the above example).

```sh
PORT=8888 nohup npm run start:site:dev &
```

The back-end takes it's config from `config.json`, so the values here need to be correct to match the server vhost, then run:

```sh
nohup npm run start:networking:dev &
```

The front-end and back-end can be killed with:

```sh
pkill -9 node webpack
```
