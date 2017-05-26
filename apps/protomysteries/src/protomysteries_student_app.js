var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", 'common/src/synergymesh_app', 'common/src/listeners/drag_listener', 'common/src/items/text_item', 'common/src/utils/transformations'], function (require, exports, synergymesh_app_1, drag_listener_1, text_item_1, transformations_1) {
    "use strict";
    var ProtomysteriesStudentApp = (function (_super) {
        __extends(ProtomysteriesStudentApp, _super);
        function ProtomysteriesStudentApp() {
            _super.call(this);
        }
        ProtomysteriesStudentApp.prototype.addContents = function () {
            var textItem = new text_item_1.TextItem(this.svg, '<b>Hello World!</b> This is a really long string!', 100, 80, 'clue', 'clue-bg', 'clue-text');
            transformations_1.Transformations.setTranslation(textItem.asItem(), this.vizWidth / 2, this.vizHeight / 2);
            transformations_1.Transformations.setScale(textItem.asItem(), 2);
            transformations_1.Transformations.setRotation(textItem.asItem(), 45);
            new drag_listener_1.DragListener(textItem.asItem(), true);
        };
        return ProtomysteriesStudentApp;
    }(synergymesh_app_1.SynergyMeshApp));
    exports.ProtomysteriesStudentApp = ProtomysteriesStudentApp;
});
//# sourceMappingURL=protomysteries_student_app.js.map