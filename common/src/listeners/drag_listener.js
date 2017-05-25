define(["require", "exports"], function (require, exports) {
    "use strict";
    var DragListener = (function () {
        function DragListener(ele, bringToFront) {
            if (bringToFront === void 0) { bringToFront = true; }
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
                self.moveElement(x, y);
            });
            ele.call(drag);
        }
        DragListener.prototype.moveElement = function (x, y) {
            this.xTranslation = x;
            this.yTranslation = y;
            this.ele.attr('transform', 'translate(' + this.xTranslation + ',' + this.yTranslation + ')');
        };
        return DragListener;
    }());
    exports.DragListener = DragListener;
});
//# sourceMappingURL=drag_listener.js.map