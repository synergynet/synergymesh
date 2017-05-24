define(["require", "exports"], function (require, exports) {
    "use strict";
    var DragListener = (function () {
        function DragListener(ele) {
            var drag = d3.behavior.drag();
            drag.on('drag', this.dragged);
            ele.call(drag);
        }
        DragListener.prototype.dragged = function (d) {
        };
        return DragListener;
    }());
    exports.DragListener = DragListener;
});
//# sourceMappingURL=drag_listener.js.map