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
		background.attr('transform', 'translate(' + (-width/2) + ', ' + (-height/2) + ')'); // TODO Make into a utility.
		
		// Set up text holder.
		let textItemHolder = this.rootNode.append('foreignObject');
		textItemHolder.attr('width', width);
		textItemHolder.attr('height', height);
		textItemHolder.attr('transform', 'translate(' + (-width/2) + ', ' + (-height/2) + ')'); // TODO Make into a utility.
				
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
	
	/**
	 * Translate the text item.
	 * 
	 * @param {number} x The x amount to translate the text item by.
	 * @param {number} y The y amount to translate the text item by.
	 */
	public setTranslation(x: number, y: number) {		
		this.rootNode.attr('transform', 'translate(' + x + ', ' + y + ')'); // TODO Make into a utility (does translation and scaling too).
	}
	
}
