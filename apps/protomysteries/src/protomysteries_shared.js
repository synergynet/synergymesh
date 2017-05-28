define(["require", "exports"], function (require, exports) {
    "use strict";
    var ProtomysteriesShared = (function () {
        function ProtomysteriesShared() {
        }
        ProtomysteriesShared.sendMessage = function (command) {
            $.ajax({
                type: 'POST',
                url: '../server/input.php',
                data: 'command=' + command,
                async: true
            });
        };
        return ProtomysteriesShared;
    }());
    exports.ProtomysteriesShared = ProtomysteriesShared;
});
//# sourceMappingURL=protomysteries_shared.js.map