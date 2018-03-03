import {CommonElements} from 'common/src/constants/common_elements'; 
import {Config} from 'common/src/utils/config'; 
import {Networking} from 'common/src/utils/networking';
  
 /**
 * Abstract class which defines what all SynergyMesh apps should do.
 * (e.g. load contents, connect to other instances, etc.)
 */
export abstract class SynergyMeshApp {	

	
	//// Private Constants. ////
	
	/** Key to use in local storage to store the session key. */
	private static SESSION_ID_STORE_KEY = 'synergymesh-session';


	//// Public Global Variables. ////
	
	/** Flag to indicate whether the app is ready yet. */
	public isReady = false;

	/** The height of the SVG element. */
	public vizHeight: number;

	/** The width of the SVG element. */
	public vizWidth: number;


	//// Public Global Variables. ////
	
	/** The URL root of the page. */
	protected rootPath;
	
	/** The ID of the network session to use. */
	protected sessionId;

	/** The width of the SVG element. */
	protected svg: d3.Selection<any>;
	
	
	//// Private Global Variables. */
	
	/** Regular expression for just alpha-numeric characters. */
	private pattern: RegExp = /[^a-zA-Z0-9 ]/g;
	
	
	//// Constructor. ////

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
		
		// Get values from config.
		Config.getConfig(this.buildAppStarter.bind(this));
		
	}
	
	/**
	 * Put in place listeners for building the app with.
	 */
	private buildAppStarter(): void{
		
		// Create self object for referencing elsewhere.
		let self = this;
		
		// Get session input.
		let sessionInput = <HTMLInputElement>document.getElementById(CommonElements.SESSION_INPUT);
		
		// Set session input default value.
		if (sessionInput != undefined) {
			if (SynergyMeshApp.SESSION_ID_STORE_KEY in localStorage) {
				sessionInput.value = localStorage[SynergyMeshApp.SESSION_ID_STORE_KEY];
			}
		}
		
		// Function for attempting to start the app.
		let startAppAttempt = function() {
			
			// Check if session input field is present.
			if (sessionInput != undefined) {
				
				// Get valid text.
				let input = sessionInput.value.replace(self.pattern, '');
				
				// Display warning if blank.
				if (input == '') {
					alert('You need to enter a session ID for this app.');
					return;
				}
				
				// Store supplied session.
				self.sessionId = input;
				localStorage[SynergyMeshApp.SESSION_ID_STORE_KEY] = input;
				
				// Hide session input and prompt.
				document.getElementById(CommonElements.SESSION_PROMPT).hidden = true;;
				sessionInput.hidden = true;
				
			}
			
			// Hide elements.
			startButton.hidden = true;
			
			// Start app.
			self.startAppEnvironment();	
			
			// Full screen on desktop.
			if(!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(navigator.userAgent))){
				self.requestFullscreen(document.getElementById(CommonElements.APP_SVG));
			}
			
		};
		
		// Create button to start the app.
		let startButton = document.getElementById(CommonElements.START_BUTTON);
		startButton.addEventListener('touchstart', function(e) {		
			e.preventDefault();
			startAppAttempt();			
		});
		
		// Add listener to session input field which filters out non-alphanumeric characters..
		$('#' + CommonElements.SESSION_INPUT).bind('keypress', function(event) {			
			let value = String.fromCharCode(event.which);			
			let sessionInput = <HTMLInputElement>document.getElementById(CommonElements.SESSION_INPUT);
			sessionInput.value = sessionInput.value.replace(self.pattern, '');
			if (event.keyCode == 13) {
				startAppAttempt();
			}
			return !self.pattern.test(value);
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
	 * Circumvent the need to press a button when testing.
	 */
	public test(): void {
		this.startAppEnvironment();	
	}
	
	
	//// Protected Methods. ////
	
	/**
	 * Add the contents specific to this app to override.
	 */
	protected addContents() {}
	
	protected establishNetworking() {
		
		// Get host and port from config.
		let host = Config.getConfigValue(Config.SERVER_HOST);
		let port = Config.getConfigValue(Config.SERVER_PORT);
		
		// Set debugging if needed.
		if (Config.getConfigValue(Config.NETWORK_DEBUGGING)) {
			Networking.debug = true;
		}
		
		// Announce presence to server.
		Networking.establishConnection(host, port);
		
	}
	
	/**
	 * Function to be called after initial setup to indicate that the app is ready.
	 */
	protected ready() {
		this.isReady = true;
	}
	
}
