define(["require", "exports"], function (require, exports) {
    "use strict";
    requirejs.config({
        paths: {
            'jquery': 'lib/scripts/jquery/jquery-2.2.0',
            'chosen': 'lib/scripts/chosen/chosen-1.6.2.jquery',
            'd3': 'lib/scripts/d3/d3-3.5.17'
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