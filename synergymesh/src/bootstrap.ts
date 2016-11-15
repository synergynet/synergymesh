/// <reference path="typings/require-2.1.20.d.ts" />

requirejs.config({
    paths: {
        'jquery': 'scripts/jquery/jquery-2.2.0',
        'chosen': 'scripts/chosen/chosen.jquery',
        'd3': 'scripts/d3/d3'
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
