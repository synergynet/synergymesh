define(["require", "exports"], function (require, exports) {
    "use strict";
    var Random = (function () {
        function Random() {
        }
        Random.getRandomArbitrary = function (min, max) {
            return Math.random() * (max - min) + min;
        };
        Random.getRandomInt = function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        return Random;
    }());
    exports.Random = Random;
});
//# sourceMappingURL=random.js.map