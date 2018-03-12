import {MysteriesApp} from 'apps/mysteries/src/mysteries_app';
import {TestHelpers} from 'test/src/utils/test_helpers';

// Define tests for the Protomysteries apps.
describe('Mysteries', function() {
	
	// Define individual test for setting up the student Protomysteries app.
	it('Mysteries Set Up', function() {
		
		// Set up app variable.
		let app: MysteriesApp;
		
		// Set flag for when initial fails.
		let fail: boolean = false;
		
		// Initial run block.
		runs(function() {
			
			// Create required contents.		
			let testDiv = document.createElement('div');
			testDiv.id = 'synergymesh-app';
			
			// Replace HTML in the test contents div.
			TestHelpers.setTestHtml(testDiv.outerHTML);
			
			// Attempt to start the app.
			try{
				app = new MysteriesApp('../apps/mysteries/web/', true);		
			}catch(e){
				fail = true;
				console.log(e);
			}
		});
		
		// Loop till created app is ready.
		waitsFor(function() {
			return fail ? fail : app.isReady;	
		}, 'The Mysteries app being prepared', 3000);
		
		// When app is ready return as a success.
		runs(function() {
			expect(fail ? !fail : app.isReady).toBe(true);
		});
		
 	});
	
});