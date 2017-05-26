define(["require", "exports"], function (require, exports) {
    "use strict";
    var UiUtilities = (function () {
        function UiUtilities() {
        }
        UiUtilities.add_break_to_element = function (id) {
            var div = document.createElement('div');
            div.style.visibility = 'hidden';
            div.innerHTML = '#';
            UiUtilities.add_to_element(id, div);
        };
        UiUtilities.add_header = function (id, hostUrl) {
            var div = document.createElement('div');
            div.classList.add('header');
            var leftImage = document.createElement('img');
            leftImage.src = hostUrl + '../../../common/web/images/header-left.jpg';
            leftImage.align = 'left';
            div.appendChild(leftImage);
            var rightImage = document.createElement('img');
            rightImage.src = hostUrl + '../../../common/web/images/header-right.jpg';
            rightImage.align = 'right';
            div.appendChild(rightImage);
            UiUtilities.add_to_element(id, div);
        };
        UiUtilities.add_horizontal_space_to_element = function (id) {
            var span = document.createElement('span');
            span.style.visibility = 'hidden';
            span.innerHTML = '#';
            UiUtilities.add_to_element(id, span);
        };
        UiUtilities.add_footer = function (id) {
            var div = document.createElement('div');
            div.classList.add('footer');
            div.innerHTML = UiUtilities.COPYRIGHT_STATEMENT;
            UiUtilities.add_to_element(id, div);
        };
        UiUtilities.add_vertical_space = function (id, height) {
            var span = document.createElement('div');
            span.style.visibility = 'hidden';
            span.innerHTML = '#';
            span.style.height = height + 'px';
            UiUtilities.add_to_element(id, span);
        };
        UiUtilities.add_to_element = function (id, element) {
            var parentElement = document.getElementById(id);
            parentElement.appendChild(element);
        };
        UiUtilities.build_button = function (id, label) {
            var button = document.createElement('button');
            button.setAttribute('id', id);
            button.innerHTML = label;
            return button;
        };
        UiUtilities.COPYRIGHT_STATEMENT = 'Copyright © 2017 CEM. All Rights Reserved.';
        UiUtilities.CONTAINER_EXPORT = 'export-controls';
        UiUtilities.CONTAINER_FILTER = 'filter-controls';
        UiUtilities.CONTAINER_SVG = 'svg-container';
        UiUtilities.CONTAINER_SVGS = 'report-svg';
        return UiUtilities;
    }());
    exports.UiUtilities = UiUtilities;
});
//# sourceMappingURL=ui_utilities.js.map