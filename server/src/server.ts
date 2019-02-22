/**
 * @module server
 */
import {Config} from '../../common/src/utils/config';
import {NetworkingService} from '../../server/src/services/networking_service';

// Get config.
Config.getConfigOnServer();

// Get config settings.
let networkingPort = Config.getConfigValue(Config.SERVER_PORT);
let devMode = <boolean>Config.getConfigValue(Config.DEV_MODE);

// Use config to work out whether to use environment details or config details.
if (!devMode) {
	networkingPort = process.env.PORT;
}

// Start the networking service.
new NetworkingService(networkingPort);
