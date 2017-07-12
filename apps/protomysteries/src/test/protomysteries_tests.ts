import {ProtomysteriesStudentApp} from 'apps/protomysteries/src/protomysteries_student_app';
import {ProtomysteriesTeacherApp} from 'apps/protomysteries/src/protomysteries_teacher_app';
import {TestHelpers} from 'test/src/utils/test_helpers';

// Define tests for the Protomysteries apps.
describe('Protomysteries', function() {
	
	// Define individual test for setting up the student Protomysteries app.
	it('Student Protomysteries', function() {
		
		// Set up app variable.
		let app: ProtomysteriesStudentApp;
		
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
				app = new ProtomysteriesStudentApp('../apps/protomysteries/web/student/');
				
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
		}, 'The Protomysteries Student app being prepared', 3000);
		
		// When app is ready return as a success.
		runs(function() {
			expect(fail ? !fail : app.isReady).toBe(true);
		});
		
 	});
	
	// Define individual test for setting up the teacher Protomysteries app.
	it('Teacher Protomysteries', function() {
		
		// Set up app variable.
		let app: ProtomysteriesTeacherApp;
		
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
				app = new ProtomysteriesTeacherApp('../apps/protomysteries/web/teacher/');
				
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
		}, 'The Protomysteries Teacher app being prepared', 3000);
		
		// When app is ready return as a success.
		runs(function() {
			expect(fail ? !fail : app.isReady).toBe(true);
		});
		
 	});
	
});