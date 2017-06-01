define(["require", "exports", 'common/src/utils/networking'], function (require, exports, networking_1) {
    "use strict";
    requirejs.config({
        paths: {
            'chosen': 'lib/scripts/chosen.jquery/chosen.jquery-1.6.2',
            'd3': 'lib/scripts/d3/d3-3.5.17',
            'jquery': 'lib/scripts/jquery/jquery-2.2.0',
            'socketioclient': 'lib/scripts/socket.io-client/socket.io-client-1.4.4'
        },
        shim: {
            jquery: {
                exports: '$'
            }
        },
    });
    function start(callback) {
        require(['socketioclient'], function (io) {
            require(['jquery', 'd3'], function () {
                require(['chosen'], function () {
                    networking_1.Networking.io = io;
                    callback();
                });
            });
        });
    }
    exports.start = start;
});
//# sourceMappingURL=bootstrap.js.map