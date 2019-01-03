/**
 * Load all the script files related to this test.
 */
function loadTest(){
	
	// Configure Require JS.
	require.config({
		baseUrl: '../',
		paths: {
			'BootStrap': 'common/src/bootstrap',
			'TestRunner':'test/src/test_runner',
		}
	});
	
	// Set up Jasmine.
	var jasmineEnv = jasmine.getEnv();
	jasmineEnv.updateInterval = 1000;
    var htmlReporter = new jasmine.HtmlReporter();
	jasmineEnv.addReporter(htmlReporter);
	jasmineEnv.specFilter = function(spec) {
		return htmlReporter.specFilter(spec);
	};
	
	// Load libraries and report test script through RequireJS.
	require(['BootStrap'], function (bootstrap) {
		bootstrap.start(function(){
			require(['TestRunner'], function (test_runner) {
				$(document).ready(function run() {
					jasmineEnv.execute();
				});
			});
		});
	});

}