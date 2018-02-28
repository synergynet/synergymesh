import {Transformations} from 'common/src/utils/transformations';
  
 /**
 * Class which defines an element with text in a box.
 */
export class TextItem {
	
	/** Size of left and right margins. */
	private static MARGINS: number = 10;
	
	/** The root node of the item. */
	public rootNode: d3.Selection<HTMLElement>;

	/**
	 * Initialise the text object.
	 */
	public constructor(parentNode: d3.Selection<HTMLElement>, 
		text: string, width: number, height: number, id: string, bgClass: string, textClass) {
		
		// Create root node.
		this.rootNode = parentNode.append('g');
		this.rootNode.attr('id', id);
		
		// Set up background rectangle with appropriate class.
		let background = this.rootNode.append('rect');
		background.classed(bgClass, true);
		background.attr('width', width + (2 * TextItem.MARGINS));
		background.attr('height', height);
		Transformations.setTranslation(background, (-width/2) - TextItem.MARGINS, -height/2);
		
		// Set up text holder.
		let textItemHolder = this.rootNode.append('text');
		textItemHolder.text(text);
		Transformations.setTranslation(textItemHolder, -width/2, -height/2);
		this.wrapText(textItemHolder, width, textClass);
		textItemHolder.classed(textClass, true);
		
	}
	
	/**
	 * Get the root node of the item.
	 * 
	 * @return {d3.Selection<HTMLElement>} The root node of the item.
	 */
	public asItem(): d3.Selection<HTMLElement> {
		return this.rootNode;
	}
	
	/**
	 * Break the text item into multiple text items of a specific width.
	 * 
	 * @param {d3.Selection<HTMLElement>} text The text item to split.
	 * @param {number} width The maximum width of the text items.
	 * @param {string} textClass The class to apply to the generated text items.
	 */
	private wrapText(text: d3.Selection<HTMLElement>, width: number, textClass: string): void {
		let words = text.text().split(' ');
		let line = [];
		let lineNumber = 1;
		let lineHeight = 1.1;
		let y = text.attr('y');
		let tspan = text.text(null).append('tspan').attr('x', 0).attr('y', (lineNumber * lineHeight) + 'em');		
		tspan.classed(textClass, true);
 		for (let word of words){
			line.push(word);
			tspan.text(line.join(' '));
			if ((<any>tspan.node()).getComputedTextLength() > width) {
				lineNumber++;
				line.pop();
				tspan.text(line.join(' '));
				line = [word];
				tspan = text.append('tspan').attr('x', 0).attr('y', (lineNumber * lineHeight) + 'em');
				tspan.classed(textClass, true);
				tspan.text(word);
			}
		}
	}
	
}
