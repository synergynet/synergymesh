var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", 'common/src/synergymesh_app', 'common/src/listeners/drag_listener'], function (require, exports, synergymesh_app_1, drag_listener_1) {
    "use strict";
    var PrototypeStudentApp = (function (_super) {
        __extends(PrototypeStudentApp, _super);
        function PrototypeStudentApp() {
            _super.call(this);
        }
        PrototypeStudentApp.prototype.addContents = function () {
            var circleOne = this.svg.append('circle');
            circleOne.attr('cx', this.vizWidth / 4);
            circleOne.attr('cy', this.vizHeight / 2);
            circleOne.attr('id', 'circle-one');
            new drag_listener_1.DragListener(circleOne);
            var circleTwo = this.svg.append('circle');
            circleTwo.attr('cx', (this.vizWidth / 4) * 3);
            circleTwo.attr('cy', this.vizHeight / 2);
            circleTwo.attr('id', 'circle-two');
            new drag_listener_1.DragListener(circleTwo);
        };
        return PrototypeStudentApp;
    }(synergymesh_app_1.SynergyMeshApp));
    exports.PrototypeStudentApp = PrototypeStudentApp;
});
//# sourceMappingURL=prototype_student_app.js.map