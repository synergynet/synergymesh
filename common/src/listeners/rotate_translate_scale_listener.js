define(["require", "exports"], function (require, exports) {
    "use strict";
    var RotateTranslateScaleListener = (function () {
        function RotateTranslateScaleListener(ele, bringToFront) {
            if (bringToFront === void 0) { bringToFront = true; }
            this.rotation = 0;
            this.scale = 0;
            this.xTranslation = 0;
            this.yTranslation = 0;
            var self = this;
            var drag = d3.behavior.drag();
            if (bringToFront) {
                drag.on('dragstart', function (d) {
                    this.parentNode.appendChild(this);
                });
            }
            drag.origin(function (d) {
                return { x: self.xTranslation, y: self.yTranslation };
            });
            this.ele = ele;
            drag.on('drag', function (d) {
                var x = d3.event.x;
                var y = d3.event.y;
                self.updateElementTransformations(x, y);
            });
            ele.call(drag);
        }
        RotateTranslateScaleListener.prototype.updateElementTransformations = function (x, y) {
            this.xTranslation = x;
            this.yTranslation = y;
        };
        return RotateTranslateScaleListener;
    }());
    exports.RotateTranslateScaleListener = RotateTranslateScaleListener;
});
//# sourceMappingURL=rotate_translate_scale_listener.js.map