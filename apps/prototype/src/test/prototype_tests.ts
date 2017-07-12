import {PrototypeStudentApp} from 'apps/prototype/src/prototype_student_app';
import {TestHelpers} from 'test/src/utils/test_helpers';

// Define tests for the Prototype apps.
describe('Prototype', function() {
	
	// Define individual test for setting up the student Prototype app.
	it('Student Prototype', function() {
		
		// Set up app variable.
		let app: PrototypeStudentApp;
		
		// Set flag for when initial fails.
		let fail: boolean = false;
		
		// Initial run block.
		runs(function() {
			
			// Create required contents.		
			let testHtml = `
				<div id="synergymesh-app"></div>
				<div class="start_app_button_wrapper">
					<button id="start_app_button">Start App</button>
				</div>`;
			
			// Replace HTML in the test contents div.
			TestHelpers.setTestHtml(testHtml);
			
			// Attempt to start the app.
			try{
				app = new PrototypeStudentApp('../apps/prototype/web/student/');
				
				// Press the start button.
				$('#start_app_button').click();
				
			}catch(e){
				fail = true;
				console.log(e);
			}
		});
		
		// Loop till created app is ready.
		waitsFor(function() {
			return fail ? fail : app.isReady;	
		}, 'The Prototype Student app being prepared', 3000);
		
		// When app is ready return as a success.
		runs(function() {
			expect(fail ? !fail : app.isReady).toBe(true);
		});
		
 	});
	
});