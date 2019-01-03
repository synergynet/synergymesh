 /**
 * Class for hosting the site from the server
 */
export class SiteService {	
	
	
	//// Private Constants ////
	
	/** Types of files to be hosted by the site service. */
	private static CONTENT_TYPES: {} = {
	    '.html': 'text/html',
	    '.css': 'text/css',
	    '.js': 'text/javascript',
	    '.json': 'text/json',
		'.png': 'image/png',
		'.jpg': 'image/jpeg',
		'.gif': 'image/gif'
	  };
	

	//// Constructor ////
	
	/**
	 * Start the site hosting on the server
	 * 
	 * @param {string} port The port to tie to the site.
	 * @param {boolean} sslMode The port to tie to the networking service.
	 */
	public constructor (port: string, sslMode: boolean) { 	
	
		// Get required libraries.
		let url = require('url');
		let path  = require('path');
		let fs = require('fs');
		
		// Establish the server.
		let requestListener = function(request, response) {
		
			// Establish where to get files from.
			let uri = url.parse(request.url).pathname;
			let filename = path.join(process.cwd(), uri);
	
			// Check the given directory.
			fs.exists(filename, function(exists) {
				
				// Output a 404 message if the content site aren't found.
			    if(!exists) {
			      response.writeHead(404, {'Content-Type': 'text/plain'});
			      response.write('404 Not Found\n');
			      response.end();
			      return;
			    }
			
				// If the given hosting location is a directory look for an index file.
			    if (fs.statSync(filename).isDirectory()) {
					filename += '/index.html';
				}
			
				// Read the given files at the url.
			    fs.readFile(filename, 'binary', function(err, file) {
					
					// If the file is unreadable output an error.
					if(err) {        
				        response.writeHead(500, {'Content-Type': 'text/plain'});
				        response.write(err + '\n');
				        response.end();
				        return;
					}
			
					// Return the page contents.
					let headers = {};
					let contentType = SiteService.CONTENT_TYPES[path.extname(filename)];
					if (contentType) { 
						headers['Content-Type'] = contentType;
					}
					response.writeHead(200, headers);
					response.write(file, 'binary');
					response.end();
				});
				
			});
			
		};
	
		// Setup basic server.
		let server;
		
		// Set up encryption if needed.
		if (sslMode) {
			
			// Get libraries needed for encryption. 
			let tls = require('tls');
			let fs = require('fs');
			
			// Get private key and certificates.
			let privateKey = fs.readFileSync('crypto/privatekey.pem').toString();
			let certificate = fs.readFileSync('crypto/certificate.pem').toString();
			
			// Create credentials.
			let credentials = tls.createSecureContext({key: privateKey, cert: certificate});
			
			// Set up secure server.
			 server = require('https').createServer(credentials, requestListener);
			
		} else {
				
			// Set up regular server.
			server = require('http').createServer(requestListener);
			
		}
		
		// Start networking server running on port.
		server.listen(port); 
			
		// Output status.
		console.log('Site now available on port ' + port);

	}
	
}
