define(["require", "exports", 'common/src/utils/networking'], function (require, exports, networking_1) {
    "use strict";
    var ProtomysteriesShared = (function () {
        function ProtomysteriesShared() {
        }
        ProtomysteriesShared.listenForMessage = function (callback) {
            if (!!window.EventSource) {
                var source = new EventSource('../server/output.php');
                source.addEventListener('message', function (e) {
                    var host = networking_1.Networking.getFullHost();
                    if (e.origin == host) {
                        var data = JSON.parse(e.data);
                        if (+data['id'] > ProtomysteriesShared.lastMessageRecievedId) {
                            callback(data);
                            ProtomysteriesShared.lastMessageRecievedId = +data['id'];
                        }
                    }
                });
            }
            else {
                alert('Your browser does not support SynergyMesh\'s networking features.');
            }
        };
        ProtomysteriesShared.sendMessage = function (command) {
            $.ajax({
                type: 'POST',
                url: '../server/input.php',
                data: 'command=' + command,
                async: true
            });
        };
        ProtomysteriesShared.lastMessageRecievedId = 0;
        return ProtomysteriesShared;
    }());
    exports.ProtomysteriesShared = ProtomysteriesShared;
});
//# sourceMappingURL=protomysteries_shared.js.map