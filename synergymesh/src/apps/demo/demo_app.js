var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", 'apps/synergymesh_app'], function (require, exports, synergymesh_app_1) {
    "use strict";
    var DemoApp = (function (_super) {
        __extends(DemoApp, _super);
        function DemoApp() {
            _super.call(this);
        }
        return DemoApp;
    }(synergymesh_app_1.SynergyMeshApp));
    exports.DemoApp = DemoApp;
});
//# sourceMappingURL=demo_app.js.map