/**
 * Class with static methods for supporting networking.
 */
export class Networking {
	
	/**
	 * Returns the current host and its protocol.
	 * 
	 * @param {string} The host and its protocol.
	 */
	public static getFullHost(): string {
		return  (<any>window).location.protocol + '//' + (<any>window).location.host;
	}
	
}
