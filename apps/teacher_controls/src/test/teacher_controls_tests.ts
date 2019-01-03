import {TeacherControlsApp} from 'apps/teacher_controls/src/teacher_controls_app';
import {TestHelpers} from 'test/src/utils/test_helpers';

// Define tests for the Teacher Controls app.
describe('Teacher Controls', function() {
	
	// Define individual test for setting up the Teacher Controls app.
	it('Teacher Controls Set Up', function() {
		
		// Set up app variable.
		let app: TeacherControlsApp;
		
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
				app = new TeacherControlsApp('../apps/teacher_controls/web/', true);
			}catch(e){
				fail = true;
				console.log(e);
			}
		});
		
		// Loop till created app is ready.
		waitsFor(function() {
			return fail ? fail : app.isReady;	
		}, 'The Teacher Controls app being set up', 3000);
		
		// When app is ready return as a success.
		runs(function() {
			expect(fail ? !fail : app.isReady).toBe(true);
		});
		
 	});
	
});