import {CommonElements} from 'common/src/constants/common_elements'; 
  
 /**
 * Abstract class which defines what all SynergyMesh apps should do.
 * (e.g. load contents, connect to other instances, etc.)
 */
export abstract class SynergyMeshApp {	

	/** The height of the SVG element. */
	protected vizHeight: number;

	/** The width of the SVG element. */
	protected vizWidth: number;
	
	/** The URL root of the page. */
	protected rootPath;

	/** The width of the SVG element. */
	protected svg: d3.Selection<any>;
	
	/** Flag to indicate whether the app is ready yet. */
	public isReady = false;

	/**
	 * Initialise a SynergyMeshApp object.
	 * 
	 * @param {string} root The URL root of the page.
	 */
	public constructor(rootPath: string = '') {
		
		// Enable touch emulator.
		TouchEmulator();
		
		// Store root.
		this.rootPath = rootPath;
		
		// Create self object for referencing elsewhere.
		let self = this;
		
		// Create button to start the app.
		let startButton = document.getElementById(CommonElements.START_BUTTON);
		startButton.addEventListener('touchend', function(e) {
			e.preventDefault();
			startButton.hidden = true;
			self.startAppEnvironment();	
			self.requestFullscreen(document.getElementById(CommonElements.APP_SVG));
		});
		
	}
	
	/**
	 * Make the supplied element fullscreen.
	 * 
	 * @param (any) ele HTML element.
	 */
	private requestFullscreen(ele: any) {
		if (ele.requestFullscreen) {
			ele.requestFullscreen();
		} else if (ele.webkitRequestFullscreen) {
			ele.webkitRequestFullscreen();
		} else if (ele.mozRequestFullScreen) {
			ele.mozRequestFullScreen();
		} else if (ele.msRequestFullscreen) {
			ele.msRequestFullscreen();
		} else {
			console.log('Fullscreen API is not supported.');
		}
	}
	
	/**
	 * Builds the initial environment.
	 */
	private startAppEnvironment() {		
	
		// Get display dimensions.
		this.vizHeight = Math.max(document.documentElement.clientHeight, window.innerHeight, screen.height|| 0);
		this.vizWidth = Math.max(document.documentElement.clientWidth, window.innerWidth, screen.width || 0);
		
		// Create SVG that fits window size.
		this.svg = d3.select('#' + CommonElements.APP_SVG_DIV).append('svg');
		this.svg.attr('xmlns', 'http://www.w3.org/2000/svg');
		this.svg.attr('height', this.vizHeight);
		this.svg.attr('width', this.vizWidth);
		this.svg.attr('id', CommonElements.APP_SVG);
		
		// Add background to SVG.
		let backgroundRectangle = this.svg.append('rect');
		backgroundRectangle.attr('height', this.vizHeight)
		backgroundRectangle.attr('width', this.vizWidth);
		backgroundRectangle.attr('id', CommonElements.APP_BG);
		
		// Call function which adds the app's specific contents.
		this.addContents();
		
	}
	
	/**
	 * Add the contents specific to this app to override.
	 */
	protected addContents() {}
	
	/**
	 * Function to be called after initial setup to indicate that the app is ready.
	 */
	protected ready() {
		this.isReady = true;
	}
	
}
