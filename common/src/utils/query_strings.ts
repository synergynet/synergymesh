/**
 * Class with static methods for supporting working with query strings in urls.
 */
export class QueryStrings {

	/**
	 * Get the query strings from the current url in an usable structure.
	 * 
	 * @returns {JSON} The results in a json object.
	 */
	public static getQueryStrings() : JSON {
		let queryString = <JSON>{};
	    let hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	    for (let i = 0; i < hashes.length; i++) {
	       let hashElements = hashes[i].split('=');
			queryString[hashElements[0]] = hashElements[1];
	    }
	    return queryString;
	}
	
}