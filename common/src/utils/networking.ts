/// <reference path='../../../lib/typings/socket.io-client-1.4.4.d.ts' />
  
 /**
 * Class with static methods for supporting networking.
 */
export class Networking {
	
	/**
	 * The static API for accessing Socket.io features set in the bootstrap.
	 */
	public static io: SocketIOClientStatic;
	
	/**
	 * Returns the current host and its protocol.
	 * 
	 * @param {string} The host and its protocol.
	 */
	public static getFullHost(): string {
		return  (<any>window).location.protocol + '//' + (<any>window).location.host;
	}
}
