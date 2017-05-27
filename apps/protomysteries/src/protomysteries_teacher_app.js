var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", 'common/src/synergymesh_app', 'common/src/items/text_item', 'common/src/utils/transformations'], function (require, exports, synergymesh_app_1, text_item_1, transformations_1) {
    "use strict";
    var ProtomysteriesTeacherApp = (function (_super) {
        __extends(ProtomysteriesTeacherApp, _super);
        function ProtomysteriesTeacherApp() {
            _super.call(this);
        }
        ProtomysteriesTeacherApp.prototype.addContents = function () {
            var freezeButton = new text_item_1.TextItem(this.svg, 'Freeze All Student Devices', 225, 25, 'freeze-button', 'freeze-bg', 'freeze-text');
            transformations_1.Transformations.setTranslation(freezeButton.asItem(), this.vizWidth / 2, (this.vizHeight / 2) - 100);
            freezeButton.asItem().on('mousedown', function () {
                $.ajax({
                    type: 'POST',
                    url: '../server/input.php',
                    data: 'command=freeze',
                    async: true
                });
            });
            var unfreezeButton = new text_item_1.TextItem(this.svg, 'Unfreeze All Student Devices', 225, 25, 'freeze-button', 'freeze-bg', 'freeze-text');
            transformations_1.Transformations.setTranslation(unfreezeButton.asItem(), this.vizWidth / 2, (this.vizHeight / 2) + 100);
            unfreezeButton.asItem().on('mousedown', function () {
                $.ajax({
                    type: 'POST',
                    url: '../server/input.php',
                    data: 'command=unfreeze',
                    async: true
                });
            });
        };
        return ProtomysteriesTeacherApp;
    }(synergymesh_app_1.SynergyMeshApp));
    exports.ProtomysteriesTeacherApp = ProtomysteriesTeacherApp;
});
//# sourceMappingURL=protomysteries_teacher_app.js.map