import {TemplateStudentApp} from 'apps/template/src/template_student_app';
import {TemplateTeacherApp} from 'apps/template/src/template_teacher_app';
import {TestHelpers} from 'test/src/utils/test_helpers';

// Define tests for the Template apps.
describe('Template', function() {
	
	// Define individual test for setting up the student Template app.
	it('Student Template', function() {
		
		// Set up app variable.
		let app: TemplateStudentApp;
		
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
				app = new TemplateStudentApp('../apps/template/web/student/');
				app.test();					
			}catch(e){
				fail = true;
				console.log(e);
			}
		});
		
		// Loop till created app is ready.
		waitsFor(function() {
			return fail ? fail : app.isReady;	
		}, 'The Template Student app being prepared', 3000);
		
		// When app is ready return as a success.
		runs(function() {
			expect(fail ? !fail : app.isReady).toBe(true);
		});
		
 	});
	
	// Define individual test for setting up the teacher Template app.
	it('Teacher Template', function() {
		
		// Set up app variable.
		let app: TemplateTeacherApp;
		
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
				app = new TemplateTeacherApp('../apps/template/web/teacher/');
				app.test();					
			}catch(e){
				fail = true;
				console.log(e);
			}
		});
		
		// Loop till created app is ready.
		waitsFor(function() {
			return fail ? fail : app.isReady;	
		}, 'The Template Teacher app being prepared', 3000);
		
		// When app is ready return as a success.
		runs(function() {
			expect(fail ? !fail : app.isReady).toBe(true);
		});
		
 	});
	
});