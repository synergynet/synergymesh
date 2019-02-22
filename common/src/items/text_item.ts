/**
 * @module items
 */

 import {Transformations} from '../../../common/src/utils/transformations';
  
 /**
 * Class which defines an element with text in a box.
 */
export class TextItem {
	
	
	//// Private Constants. ////
	
	/** Size of left and right margins. */
	private static MARGINS: number = 10;
	
	/** Height of lines. */
	private static LINE_HEIGHT: number = 1.1;
	
	
	//// Private Global Variables. ////
	
	/** The root node of the item. */
	public rootNode: d3.Selection<HTMLElement>;
	
	/** The height of the item. */
	private height: number = 0;
	
	/** The width of the item. */
	private width: number = 0;
	
	
	//// Constructor. ////

	/**
	 * Initialise the text object.
	 * 
	 * @param {d3.Selection<HTMLElement>} parentNode The element to attach the item to.
	 * @param {string} text The text to show in the item.
	 * @param {number} maxWidth The maximum width the text item can be.
	 * @param {string} id The unique ID of the text item when created.
	 * @param {string} bgClass Class to apply to the background.
	 * @param {string} textClass Class to apply to the text.
	 */
	public constructor(parentNode: d3.Selection<HTMLElement>, text: string, maxWidth: number, id: string, bgClass: string, textClass: string) {
		
		// Create root node.
		this.rootNode = parentNode.append('g');
		this.rootNode.attr('id', id);
		
		// Set up background rectangle with appropriate class.
		let background = this.rootNode.append('rect');
		
		// Set up text holder.
		let textItemHolder = this.rootNode.append('text');
		textItemHolder.text(text);
		this.wrapText(textItemHolder, maxWidth, textClass);
		Transformations.setTranslation(textItemHolder, -this.width/2, -this.height/2);
		textItemHolder.classed(textClass, true);
		
		// Set up background.
		background.classed(bgClass, true);
		background.attr('width', this.width + (2 * TextItem.MARGINS));
		background.attr('height', this.height + 'em');
		Transformations.setTranslation(background, (-this.width/2) - TextItem.MARGINS, -this.height/2);
		
	}
	
	
	//// Public Methods. ////
	
	/**
	 * Get the root node of the item.
	 * 
	 * @return {d3.Selection<HTMLElement>} The root node of the item.
	 */
	public asItem(): d3.Selection<HTMLElement> {
		return this.rootNode;
	}
	
	/**
	 * Get the height of the element created..
	 * 
	 * @return {number} The height of the element..
	 */
	public getHeight(): number {
		return this.height;
	}
	
	/**
	 * Get the width of the element created..
	 * 
	 * @return {number} The width of the element..
	 */
	public getWidth(): number {
		return this.width;
	}
	
	
	//// Private methods. ////
	
	/**
	 * Break the text item into multiple text items of a specific width.
	 * 
	 * @param {d3.Selection<HTMLElement>} text The text item to split.
	 * @param {number} width The maximum width of the text items.
	 * @param {string} textClass The class to apply to the generated text items.
	 */
	private wrapText(text: d3.Selection<HTMLElement>, maxWidth: number, textClass: string): void {
		
		let words = text.text().split(' ');
		let line: any[] = [];
		let lineNumber = 1;
		let y = text.attr('y');
		let tspan = text.text(null).append('tspan').attr('x', 0).attr('y', (lineNumber * TextItem.LINE_HEIGHT) + 'em');		
		tspan.classed(textClass, true);
 		for (let word of words){
			line.push(word);
			tspan.text(line.join(' '));
				
			// Check if line has exceeded the width.
			if ( (<any>tspan.node()).getComputedTextLength() > maxWidth) {
				lineNumber++;
				line.pop();
				tspan.text(line.join(' '));
				if (this.width <  (<any>tspan.node()).getComputedTextLength()) {
					this.width =  (<any>tspan.node()).getComputedTextLength();
				}
				line = [word];
				tspan = text.append('tspan').attr('x', 0).attr('y', (lineNumber * TextItem.LINE_HEIGHT) + 'em');
				tspan.classed(textClass, true);
				tspan.text(word);
			}
		}
		
		// Try setting width if only 1 line was needed.
		if (this.width <  (<any>tspan.node()).getComputedTextLength()) {
			this.width =  (<any>tspan.node()).getComputedTextLength();
		}
		
		// Set height.
		this.height = (1+ lineNumber) * TextItem.LINE_HEIGHT;
		
	}
	
}
