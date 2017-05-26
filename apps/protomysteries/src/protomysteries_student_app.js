var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", 'common/src/synergymesh_app', 'common/src/listeners/drag_listener', 'common/src/utils/random', 'common/src/items/text_item', 'common/src/utils/transformations'], function (require, exports, synergymesh_app_1, drag_listener_1, random_1, text_item_1, transformations_1) {
    "use strict";
    var ProtomysteriesStudentApp = (function (_super) {
        __extends(ProtomysteriesStudentApp, _super);
        function ProtomysteriesStudentApp() {
            _super.call(this);
        }
        ProtomysteriesStudentApp.prototype.addContents = function () {
            var textItem = new text_item_1.TextItem(this.svg, 'Can you work out what Mike should have to eat?', 500, 30, 'title', 'title-bg', 'title-text');
            transformations_1.Transformations.setTranslation(textItem.asItem(), this.vizWidth / 2, 300);
            var clueOneText = 'The new cook at school, Mrs Baker, has mixed up the trays with the children’s school dinners on.';
            var clueTwoText = '"YUCK!" cried Ruby, making a face at the slice of pizza in front of her. "I can\'t stand pepperoni!"';
            var clueThreeText = '"Don\'t look at me," moaned Jack. "I hate any food with cheese on it." At that, he pushed away his cheeseburger.';
            var clueFourText = '"Hey, anybody want these chicken wings?" asked Grace. "I don\'t like anything with meat in it."';
            var clueFiveText = 'Mike scooped up a spoonful of his yogurt and grumbled, "Everybody knows I\'m allergic to this stuff."';
            var clueSixText = '"Well, yogurt is the only thing I like on the menu," replied Tanya. ' +
                '"And there\'s no way I\'m going to eat THIS!" At that, she poked her salad with a fork.';
            this.addClue('clue1', 'clue', clueOneText, 260, 75);
            this.addClue('clue2', 'clue', clueTwoText, 250, 75);
            this.addClue('clue3', 'clue', clueThreeText, 250, 100);
            this.addClue('clue4', 'clue', clueFourText, 275, 75);
            this.addClue('clue5', 'clue', clueFiveText, 250, 100);
            this.addClue('clue6', 'clue', clueSixText, 250, 125);
            this.addImage('image1', '../burger.png');
            this.addImage('image2', '../fries.png');
            this.addImage('image3', '../grace.png');
            this.addImage('image4', '../jack.png');
            this.addImage('image5', '../mike.png');
            this.addImage('image6', '../pizza.png');
            this.addImage('image7', '../ruby.png');
            this.addImage('image8', '../salad.png');
            this.addImage('image9', '../tanya.png');
            this.addImage('image10', '../yogurt.png');
        };
        ProtomysteriesStudentApp.prototype.addClue = function (id, className, text, width, height) {
            var textItem = new text_item_1.TextItem(this.svg, text, width, height, id, className + '-bg', className + 'text');
            transformations_1.Transformations.setTranslation(textItem.asItem(), this.vizWidth / 2, this.vizHeight / 2);
            transformations_1.Transformations.setScale(textItem.asItem(), random_1.Random.getRandomArbitrary(1.25, 1.75));
            transformations_1.Transformations.setRotation(textItem.asItem(), random_1.Random.getRandomInt(-45, 45));
            new drag_listener_1.DragListener(textItem.asItem(), true);
        };
        ProtomysteriesStudentApp.prototype.addImage = function (id, imageUrl) {
            var imageEle = this.svg.append('image');
            imageEle.attr('xlink:href', imageUrl);
            transformations_1.Transformations.setTranslationX(imageEle, this.vizWidth / 2);
            transformations_1.Transformations.setTranslationY(imageEle, this.vizHeight / 2);
            transformations_1.Transformations.setScale(imageEle, random_1.Random.getRandomArbitrary(0.5, 1));
            transformations_1.Transformations.setRotation(imageEle, random_1.Random.getRandomInt(-45, 45));
            imageEle.attr('id', id);
            new drag_listener_1.DragListener(imageEle);
        };
        return ProtomysteriesStudentApp;
    }(synergymesh_app_1.SynergyMeshApp));
    exports.ProtomysteriesStudentApp = ProtomysteriesStudentApp;
});
//# sourceMappingURL=protomysteries_student_app.js.map