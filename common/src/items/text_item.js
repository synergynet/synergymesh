define(["require", "exports", 'common/src/utils/transformations'], function (require, exports, transformations_1) {
    "use strict";
    var TextItem = (function () {
        function TextItem(parentNode, text, width, height, id, bgClass, textClass) {
            this.rootNode = parentNode.append('g');
            this.rootNode.attr('id', id);
            var background = this.rootNode.append('rect');
            background.classed(bgClass, true);
            background.attr('width', width);
            background.attr('height', height);
            transformations_1.Transformations.setTranslation(background, -width / 2, -height / 2);
            var textItemHolder = this.rootNode.append('foreignObject');
            textItemHolder.attr('width', width);
            textItemHolder.attr('height', height);
            transformations_1.Transformations.setTranslation(textItemHolder, -width / 2, -height / 2);
            var textItem = textItemHolder.append('xhtml:div').append('div');
            textItem.classed(textClass, true);
            textItem.html(text);
        }
        TextItem.prototype.asItem = function () {
            return this.rootNode;
        };
        return TextItem;
    }());
    exports.TextItem = TextItem;
});
//# sourceMappingURL=text_item.js.map