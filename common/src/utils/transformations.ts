/**
 * Class with static methods for getting and setting various transformations.
 */
export class Transformations {
	
	/**
	 * Get the value of an element's rotation transformation.
	 * 
	 * @param {d3.Selection<HTMLElement>} ele The element to get the rotation information for.
	 */
	public static getRotation(ele: d3.Selection<HTMLElement>): number {
		let transform = d3.transform(ele.attr('transform'));
		return +transform.rotate;;
	}
	
	/**
	 * Get the value of an element's scale transformation.
	 * 
	 * @param {d3.Selection<HTMLElement>} ele The element to get the scale information for.
	 */
	public static getScale(ele: d3.Selection<HTMLElement>): number {
		let transform = d3.transform(ele.attr('transform'));
		return +transform.scale[0];
	}
	
		/**
	 * Get the x value of an element's translation transformation.
	 * 
	 * @param {d3.Selection<HTMLElement>} ele The element to get the translation information for.
	 */
	public static getTranslationX(ele: d3.Selection<HTMLElement>): number {
		let transform = d3.transform(ele.attr('transform'));
		return +transform.translate[0];
	}
	
	/**
	 * Get the y value of an element's translation transformation.
	 * 
	 * @param {d3.Selection<HTMLElement>} ele The element to get the translation information for.
	 */
	public static getTranslationY(ele: d3.Selection<HTMLElement>): number {
		let transform = d3.transform(ele.attr('transform'));
		return +transform.translate[1];
	}
	
	/**
	 * Set the value of an element's rotation transformation.
	 * 
	 * @param {d3.Selection<HTMLElement>} ele The element to set the rotation information for.
	 * @param {number} rotation The amount to rotate the element by.
	 */
	public static setRotation(ele: d3.Selection<HTMLElement>, rotation: number): void {
		let scale = Transformations.getScale(ele);
		let x = Transformations.getTranslationX(ele);
		let y = Transformations.getTranslationY(ele);
		Transformations.setTransformation(ele, rotation, scale, x, y);
	}
	
	/**
	 * Set the value of an element's scale transformation.
	 * 
	 * @param {d3.Selection<HTMLElement>} ele The element to set the scale information for.
	 * @param {number} scale The amount to scale the element by.
	 */
	public static setScale(ele: d3.Selection<HTMLElement>, scale: number): void {
		let rotation = Transformations.getRotation(ele);
		let x = Transformations.getTranslationX(ele);
		let y = Transformations.getTranslationY(ele);
		Transformations.setTransformation(ele, rotation, scale, x, y);
	}
	
	/**
	 * Set the x and y value of an element's translation transformation.
	 * 
	 * @param {d3.Selection<HTMLElement>} ele The element to set the translation information for.
	 * @param {number} x The x value to set the element's translation to. 
	 * @param {number} y The y value to set the element's translation to. 
	 */
	public static setTranslation(ele: d3.Selection<HTMLElement>, x: number, y: number): void {
		let scale = Transformations.getScale(ele);
		let rotation = Transformations.getRotation(ele);
		Transformations.setTransformation(ele, rotation, scale, x, y);
	}
	
	/**
	 * Set the x value of an element's translation transformation.
	 * 
	 * @param {d3.Selection<HTMLElement>} ele The element to get the x translation information for.
	 * @param {number} x The x value to set the element's translation to. 
	 */
	public static setTranslationX(ele: d3.Selection<HTMLElement>, x: number): void {
		let scale = Transformations.getScale(ele);
		let rotation = Transformations.getRotation(ele);
		let y = Transformations.getTranslationY(ele);
		Transformations.setTransformation(ele, rotation, scale, x, y);
	}
	
	/**
	 * Set the y value of an element's translation transformation.
	 * 
	 * @param {d3.Selection<HTMLElement>} ele The element to get the y translation information for.
	 * @param {number} y The y value to set the element's translation to. 
	 */
	public static setTranslationY(ele: d3.Selection<HTMLElement>, y: number): void {
		let scale = Transformations.getScale(ele);
		let rotation = Transformations.getRotation(ele);
		let x = Transformations.getTranslationX(ele);
		Transformations.setTransformation(ele, rotation, scale, x, y);
	}
	
	/**
	 * Set all the transformations of an element.
	 * 
	 *  @param {d3.Selection<HTMLElement>} ele The element to set the translation information for.
	 * @param {number} rotation The amount to rotate the element by.
	 * @param {number} scale The amount to scale the element by.
	 * @param {number} x The x value to set the element's translation to. 
	 * @param {number} y The y value to set the element's translation to. 
	 */
	public static setTransformation(ele: d3.Selection<HTMLElement>, rotation: number, scale: number, x: number, y: number): void {
		
		// Check valid numbers supplied.
		if (isNaN(rotation) || isNaN(scale) || isNaN(x) || isNaN(y)) {
			return;
		}
		
		// Build transform string representing the transformations.
		let transformationString = '';
		transformationString += 'translate(' + x + ',' + y +')';
		transformationString += 'rotate(' + rotation +')';
		transformationString += 'scale(' + scale + ',' + scale +')';
		
		// Apply the transformation string to the  
		ele.attr('transform', transformationString);
	}
	
}
