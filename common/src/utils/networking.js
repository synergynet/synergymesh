define(["require", "exports"], function (require, exports) {
    "use strict";
    var Networking = (function () {
        function Networking() {
        }
        Networking.getFullHost = function () {
            return window.location.protocol + '//' + window.location.host;
        };
        return Networking;
    }());
    exports.Networking = Networking;
});
//# sourceMappingURL=networking.js.map