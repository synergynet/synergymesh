define(["require", "exports"], function (require, exports) {
    "use strict";
    var Transformations = (function () {
        function Transformations() {
        }
        Transformations.getRotation = function (ele) {
            var transform = d3.transform(ele.attr('transform'));
            return +transform.rotate;
            ;
        };
        Transformations.getScale = function (ele) {
            var transform = d3.transform(ele.attr('transform'));
            return +transform.scale[0];
        };
        Transformations.getTranslationX = function (ele) {
            var transform = d3.transform(ele.attr('transform'));
            return +transform.translate[0];
        };
        Transformations.getTranslationY = function (ele) {
            var transform = d3.transform(ele.attr('transform'));
            return +transform.translate[1];
        };
        Transformations.setRotation = function (ele, rotation) {
            var scale = Transformations.getScale(ele);
            var x = Transformations.getTranslationX(ele);
            var y = Transformations.getTranslationY(ele);
            Transformations.setTransformation(ele, rotation, scale, x, y);
        };
        Transformations.setScale = function (ele, scale) {
            var rotation = Transformations.getRotation(ele);
            var x = Transformations.getTranslationX(ele);
            var y = Transformations.getTranslationY(ele);
            Transformations.setTransformation(ele, rotation, scale, x, y);
        };
        Transformations.setTranslation = function (ele, x, y) {
            var scale = Transformations.getScale(ele);
            var rotation = Transformations.getRotation(ele);
            Transformations.setTransformation(ele, rotation, scale, x, y);
        };
        Transformations.setTranslationX = function (ele, x) {
            var scale = Transformations.getScale(ele);
            var rotation = Transformations.getRotation(ele);
            var y = Transformations.getTranslationY(ele);
            Transformations.setTransformation(ele, rotation, scale, x, y);
        };
        Transformations.setTranslationY = function (ele, y) {
            var scale = Transformations.getScale(ele);
            var rotation = Transformations.getRotation(ele);
            var x = Transformations.getTranslationX(ele);
            Transformations.setTransformation(ele, rotation, scale, x, y);
        };
        Transformations.setTransformation = function (ele, rotation, scale, x, y) {
            var transformationString = '';
            transformationString += 'translate(' + x + ',' + y + ')';
            transformationString += 'rotate(' + rotation + ')';
            transformationString += 'scale(' + scale + ',' + scale + ')';
            ele.attr('transform', transformationString);
        };
        return Transformations;
    }());
    exports.Transformations = Transformations;
});
//# sourceMappingURL=transformations.js.map