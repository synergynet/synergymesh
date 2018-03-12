// Establish where the target class is located.
var APPS_PATH = './apps/';

/**
 * Load all the script files related to this app.
 * 
 * @param root The url of the script store relative to the page calling it.
 */
function loadApp(root){
	
	// Configure Require JS.
	require.config({
		baseUrl: root,
		paths: {
			'BootStrap': 'common/src/bootstrap',
			'MysteriesApp': APPS_PATH + 'mysteries/src/mysteries_app',
		}
	});
	
	// Load libraries and report script through RequireJS.
	require(['BootStrap'], function (bootstrap) {
		bootstrap.start(function(){
			require(['MysteriesApp'], function (mysteries_app) {
				$(document).ready(function run() {
					
					// Disable Zoom Gesture.
					d3.select("body")
					    .on("touchstart", noZoom)
					    .on("touchmove", noZoom);
					
					// Call app.
					new mysteries_app.MysteriesApp();
					
				});
			});
		});
	});

}

/**
 * Prevents zoom gestures.
 */
function noZoom() {
	d3.event.preventDefault();
}