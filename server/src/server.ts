/// <reference path='../../lib/typings/socket.io-1.4.4.d.ts' />

import {Config} from '../../common/src/utils/config';
import {NetworkingService} from '../../server/src/services/networking_service';
import {SiteService} from '../../server/src/services/site_service';

// Get config.
Config.getConfigOnServer();

// Get config settings.
let networkingPort = Config.getConfigValue(Config.SERVER_PORT);
let sitePort = Config.getConfigValue(Config.SITE_PORT);
let devMode = <boolean>Config.getConfigValue(Config.DEV_MODE);
let serverMode = Config.getConfigValue(Config.SERVER_MODE);
let sslMode = Config.getConfigValue(Config.SSL_MODE);

// Use config to work out whether to use environment details or config details.
if (!devMode) {
	networkingPort = process.env.PORT;
	sitePort = process.env.PORT;
}

// Start the networking service.
if (serverMode == 'networking' || serverMode == 'both' ) {
	new NetworkingService(networkingPort, sslMode);
}

// Start the site server.
if (serverMode == 'site' || serverMode == 'both' ) {
	new SiteService(sitePort, sslMode);
}
