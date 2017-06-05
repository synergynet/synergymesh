/// <reference path="../../lib/typings/require-2.1.20.d.ts" />

import {Networking} from 'common/src/utils/networking';

requirejs.config({
	paths: {
		'chosen': 'lib/scripts/chosen.jquery/chosen.jquery-1.6.2',
		'd3': 'lib/scripts/d3/d3-3.5.17',
		'interact': 'lib/scripts/interactjs/interact-1.2.8',
		'jquery': 'lib/scripts/jquery/jquery-2.2.0',
		'socketioclient': 'lib/scripts/socket.io-client/socket.io-client-1.4.4'
	},
	shim: {
		jquery: {
			exports: '$'
		}
	},
});

/**
 * Load the required libraries before starting the app.
 * 
 * @param callback Function called to initialise the page's corresponding app.
 */
export function start(callback) {
	require(['socketioclient'], (io) => {
		require(['jquery', 'd3', 'interact'], () => {
			require(['chosen'], () => {
				Networking.io = io;
				callback();
			});
		});
	});
}
