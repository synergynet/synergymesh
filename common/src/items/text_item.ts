import {Transformations} from 'common/src/utils/transformations';
  
 /**
 * Class which defines an element with text in a box.
 */
export class TextItem {
	
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
		background.attr('width', width);
		background.attr('height', height);
		Transformations.setTranslation(background, -width/2, -height/2);
		
		// Set up text holder.
		let textItemHolder = this.rootNode.append('foreignObject');
		textItemHolder.attr('width', width);
		textItemHolder.attr('height', height);
		Transformations.setTranslation(textItemHolder, -width/2, -height/2);
				
		// Set up text with appropriate class.
		let textItem = textItemHolder.append('xhtml:div').append('div');
		textItem.classed(textClass, true);
		textItem.html(text);
		
	}
	
	/**
	 * Get the root node of the item.
	 * 
	 * @return {d3.Selection<HTMLElement>} The root node of the item.
	 */
	public asItem(): d3.Selection<HTMLElement> {
		return this.rootNode;
	}
	
}
