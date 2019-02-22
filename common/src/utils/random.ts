/**
 * @module utilities
 */

 /**
 * Class with static methods for getting random values in ranges.
 */
export class Random {
	
	/**
	 * Returns a random number between min (inclusive) and max (exclusive)
	 * 
	 * @param {number} min The bottom of the range.
	 * @param {number} max The top of the range.
	 * @param {number} Random value.
	 */
	public static getRandomArbitrary(min: number, max: number): number {
		return Math.random() * (max - min) + min;
	}
	
	/**
	 * Returns a random integer between min (inclusive) and max (inclusive).
	 * 
	 * @param {number} min The bottom of the range.
	 * @param {number} max The top of the range.
	 * @param {number} Random integer.
	 */
	public static getRandomInt(min: number, max: number): number {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	
}
