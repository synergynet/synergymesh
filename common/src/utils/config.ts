/**
 * @module utilities
 */
import * as fs from 'fs';
import * as $ from 'jquery';

/**
 * Class with static methods for supporting loading from config.
 */
export class Config {
	

	//// Public Constants. ////
	
	/** The config key for whether dev mode is enabled. */
	public static DEV_MODE: string = 'dev-mode';
	
	/** The config key for whether network debugging is enabled. */
	public static NETWORK_DEBUGGING: string = 'debug';
	
	/** The config key for the host address of the server. */
	public static SERVER_HOST: string = 'server-host';
	
	/** The config key for the port number of the server. */
	public static SERVER_PORT: string = 'server-port';
	

	//// Private Constants. ////
	
	/** The URL of the config file relative to app pages. */
	private static CONFIG_ADDRESS: string = '../../../config.json';
	
	/** The URL of the config file relative to the server. */
	private static CONFIG_ADDRESS_SERVER: string = '/../../../config.json';
	
	/** The URL of the config file relative to test pages. */
	private static CONFIG_ADDRESS_TEST: string = '../config.json';
	

	//// Private Global Variables. ////
	
	/** The config values in JSON form. */
	public static config: JSON;
	
	/** Flag to indicate if networking is enabled. */
	private static enabled: boolean = true;
	
	
	//// Public Static Methods. ////
	
	/**
	 * Get the config file and read the config values from it.
	 * 
	 * @param {boolean} testMode Flag to indicate if the app is in test mode.
	 * @param {() => void} callback Function to call when config is collected.
	 */
	public static getConfig(testMode: boolean, callback: () => void): void { 	
	
		// Establish config address.
		let configAddress = Config.CONFIG_ADDRESS;
		if (testMode) {
			configAddress = Config.CONFIG_ADDRESS_TEST;
		}
		
		// Read from config file.
		$.getJSON(configAddress, function(json) {
			
			// Store the config settings.
			Config.config = json;
		
			// Call callback.
			callback();
			
		});
	
	}
	
	/**
	 * Get the config file and read the config values from it on the node server.
	 */
	public static getConfigOnServer(): void { 
		Config.config = JSON.parse(fs.readFileSync(__dirname + Config.CONFIG_ADDRESS_SERVER, 'utf8'));	
	}
	
	/**
	 * Get a config value.
	 * 
	 * @param {string} key The config value to get.
	 * @returns The value from the config.
	 */
	public static getConfigValue(key: string): any { 	 
		return Config.config[key];	
	}
	
}
