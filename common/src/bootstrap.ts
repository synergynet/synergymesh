/// <reference path="../../lib/typings/require-2.1.20.d.ts" />

requirejs.config({
	paths: {
		'chosen': 'lib/scripts/chosen.jquery/chosen.jquery-1.6.2',
		'd3': 'lib/scripts/d3/d3-3.5.17',
		'jquery': 'lib/scripts/jquery/jquery-2.2.0'
	},
	shim: {
		jquery: {
			exports: '$',
		},
	},
});

/**
 * Load the required libraries before starting the app.
 * 
 * @param callback Function called to initialise the page's corresponding app.
 */
export function start(callback) {
	require(['jquery', 'd3'], () => {
		require(['chosen'], () => {
			callback();
		});
	});
}
