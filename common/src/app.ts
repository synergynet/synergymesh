/**
 * @module common
 */
import {MysteriesApp} from '../../apps/mysteries/src/mysteries_app';
import {PrototypeApp} from '../../apps/prototype/src/prototype_app';
import {TeacherControlsApp} from '../../apps/teacher_controls/src/teacher_controls_app';

/**
 * Run an app.
 *
 * @param appName The name of the app to run.
 */
export function runApp(appName: string): void {
	switch (appName){
		case 'mysteries': {
			new MysteriesApp('../');
			break;
		}
		case 'prototype': {
			new PrototypeApp('../');
			break;
		}
		case 'teacher-controls': {
			new TeacherControlsApp('../');
			break;
		}
		default: {
			alert('No app supplied.');
		}
	}
}

// Run the appropriate app.
declare var appName: string;
runApp(appName);