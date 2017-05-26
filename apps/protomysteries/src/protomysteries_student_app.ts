import {SynergyMeshApp} from 'common/src/synergymesh_app';
import {DragListener} from 'common/src/listeners/drag_listener';
import {TextItem} from 'common/src/items/text_item';
import {Transformations} from 'common/src/utils/transformations';
  
 /**
 * Protomysteries student app.
 */
export class ProtomysteriesStudentApp extends SynergyMeshApp {

	/**
	 * Initialise a ProtomysteriesStudentApp object.
	 */
	public constructor() {
		
		// Establish the environment.
		super();
		
	}
	
	/**
	 * Add the contents specific to this app.
	 */
	protected addContents() {
		
		// TODO Hard coded text clues and images + header.
				
		// Create text item.
		let textItem =
			new TextItem(this.svg, '<b>Hello World!</b> This is a really long string!', 100, 80, 'clue', 'clue-bg', 'clue-text');
		Transformations.setTranslation(textItem.asItem(), this.vizWidth/2, this.vizHeight/2);
		Transformations.setScale(textItem.asItem(), 2);
		Transformations.setRotation(textItem.asItem(), 45);
		new DragListener(textItem.asItem(), true);		
				
	}
	
}
