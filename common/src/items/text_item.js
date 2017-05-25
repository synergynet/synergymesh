define(["require", "exports"], function (require, exports) {
    "use strict";
    var TextItem = (function () {
        function TextItem(parentNode, text, width, height, id, bgClass, textClass) {
            this.rootNode = parentNode.append('g');
            this.rootNode.attr('id', id);
            var background = this.rootNode.append('rect');
            background.classed(bgClass, true);
            background.attr('width', width);
            background.attr('height', height);
            background.attr('transform', 'translate(' + (-width / 2) + ', ' + (-height / 2) + ')');
            var textItemHolder = this.rootNode.append('foreignObject');
            textItemHolder.attr('width', width);
            textItemHolder.attr('height', height);
            textItemHolder.attr('transform', 'translate(' + (-width / 2) + ', ' + (-height / 2) + ')');
            var textItem = textItemHolder.append('xhtml:div').append('div');
            textItem.classed(textClass, true);
            textItem.html(text);
        }
        TextItem.prototype.asItem = function () {
            return this.rootNode;
        };
        TextItem.prototype.setTranslation = function (x, y) {
            this.rootNode.attr('transform', 'translate(' + x + ', ' + y + ')');
        };
        return TextItem;
    }());
    exports.TextItem = TextItem;
});
//# sourceMappingURL=text_item.js.map