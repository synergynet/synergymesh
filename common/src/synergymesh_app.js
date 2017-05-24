define(["require", "exports", 'common/src/constants/common_elements'], function (require, exports, common_elements_1) {
    "use strict";
    var SynergyMeshApp = (function () {
        function SynergyMeshApp() {
            var self = this;
            var startButton = document.getElementById(common_elements_1.CommonElements.START_BUTTON);
            startButton.addEventListener('click', function (e) {
                e.preventDefault();
                startButton.hidden = true;
                self.requestFullscreen(document.body);
                self.startAppEnvironment();
            });
        }
        SynergyMeshApp.prototype.requestFullscreen = function (ele) {
            if (ele.requestFullscreen) {
                ele.requestFullscreen();
            }
            else if (ele.webkitRequestFullscreen) {
                ele.webkitRequestFullscreen();
            }
            else if (ele.mozRequestFullScreen) {
                ele.mozRequestFullScreen();
            }
            else if (ele.msRequestFullscreen) {
                ele.msRequestFullscreen();
            }
            else {
                console.log('Fullscreen API is not supported.');
            }
        };
        SynergyMeshApp.prototype.startAppEnvironment = function () {
            this.vizHeight = screen.height;
            this.vizWidth = screen.width;
            this.svg = d3.select('#' + common_elements_1.CommonElements.APP_SVG_DIV).append('svg');
            this.svg.attr('xmlns', 'http://www.w3.org/2000/svg');
            this.svg.attr('height', this.vizHeight);
            this.svg.attr('width', this.vizWidth);
            this.svg.attr('id', common_elements_1.CommonElements.APP_SVG);
            var backgroundRectangle = this.svg.append('rect');
            backgroundRectangle.attr('height', this.vizHeight);
            backgroundRectangle.attr('width', this.vizWidth);
            backgroundRectangle.attr('id', common_elements_1.CommonElements.APP_BG);
            this.addContents();
        };
        SynergyMeshApp.prototype.addContents = function () { };
        return SynergyMeshApp;
    }());
    exports.SynergyMeshApp = SynergyMeshApp;
});
//# sourceMappingURL=synergymesh_app.js.map