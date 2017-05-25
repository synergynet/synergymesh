var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", 'common/src/synergymesh_app', 'common/src/listeners/drag_listener', 'common/src/listeners/rotate_translate_scale_listener', 'common/src/items/text_item'], function (require, exports, synergymesh_app_1, drag_listener_1, rotate_translate_scale_listener_1, text_item_1) {
    "use strict";
    var PrototypeStudentApp = (function (_super) {
        __extends(PrototypeStudentApp, _super);
        function PrototypeStudentApp() {
            _super.call(this);
        }
        PrototypeStudentApp.prototype.addContents = function () {
            var circleOne = this.svg.append('circle');
            circleOne.attr('r', PrototypeStudentApp.RADIUS);
            circleOne.attr('cx', this.vizWidth / 4);
            circleOne.attr('cy', this.vizHeight / 2);
            circleOne.attr('id', 'circle-one');
            new drag_listener_1.DragListener(circleOne);
            var circleTwo = this.svg.append('circle');
            circleTwo.attr('r', PrototypeStudentApp.RADIUS);
            circleTwo.attr('cx', (this.vizWidth / 4) * 3);
            circleTwo.attr('cy', this.vizHeight / 2);
            circleTwo.attr('id', 'circle-two');
            new drag_listener_1.DragListener(circleTwo);
            var rectangleOne = this.svg.append('rect');
            rectangleOne.attr('width', PrototypeStudentApp.RECTANGLE_WIDTH);
            rectangleOne.attr('height', PrototypeStudentApp.RECTANGLE_HEIGHT);
            rectangleOne.attr('x', (this.vizWidth / 2) - (PrototypeStudentApp.RECTANGLE_WIDTH / 2));
            rectangleOne.attr('y', (this.vizHeight / 4) - (PrototypeStudentApp.RECTANGLE_HEIGHT / 2));
            rectangleOne.attr('id', 'rectangle-one');
            new rotate_translate_scale_listener_1.RotateTranslateScaleListener(rectangleOne);
            var rectangleTwo = this.svg.append('rect');
            rectangleTwo.attr('width', PrototypeStudentApp.RECTANGLE_WIDTH);
            rectangleTwo.attr('height', PrototypeStudentApp.RECTANGLE_HEIGHT);
            rectangleTwo.attr('x', (this.vizWidth / 2) - (PrototypeStudentApp.RECTANGLE_WIDTH / 2));
            rectangleTwo.attr('y', ((this.vizHeight / 4) * 3) - (PrototypeStudentApp.RECTANGLE_HEIGHT / 2));
            rectangleTwo.attr('id', 'rectangle-two');
            new rotate_translate_scale_listener_1.RotateTranslateScaleListener(rectangleTwo);
            var textItem = new text_item_1.TextItem(this.svg, '<b>Hello World!</b> This is a really long string!', 100, 80, 'demo-text', 'demo-text-bg', 'demo-text-text');
            textItem.setTranslation(this.vizWidth / 2, this.vizHeight / 2);
            new drag_listener_1.DragListener(textItem.asItem(), true, this.vizWidth / 2, this.vizHeight / 2);
        };
        PrototypeStudentApp.RADIUS = 50;
        PrototypeStudentApp.RECTANGLE_WIDTH = 100;
        PrototypeStudentApp.RECTANGLE_HEIGHT = 50;
        return PrototypeStudentApp;
    }(synergymesh_app_1.SynergyMeshApp));
    exports.PrototypeStudentApp = PrototypeStudentApp;
});
//# sourceMappingURL=prototype_student_app.js.map