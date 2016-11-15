define(["require", "exports"], function (require, exports) {
    "use strict";
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
    function start(callback) {
        require(['jquery', 'd3'], function () {
            require(['chosen'], function () {
                callback();
            });
        });
    }
    exports.start = start;
});
//# sourceMappingURL=bootstrap.js.map