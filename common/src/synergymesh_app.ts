import {CommonElements} from 'common/src/constants/common_elements'; 
import {CommonNetworkEvents} from 'common/src/constants/common_network_events'; 
import {Config} from 'common/src/utils/config'; 
import {Networking} from 'common/src/utils/networking';
import {Roles} from 'common/src/constants/roles'; 
  
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


	//// Protected Global Variables. ////
	
	/** The name of this app. */
	protected appName: string = 'SynergyMesh';
	
	/** The URL root of the page. */
	protected rootPath;
	
	/** The role of the intended user of this app. */
	protected role: string = Roles.STUDENT;
	
	/** The ID of the network session to use. */
	protected sessionId;

	/** The svg which holds all the elements. */
	protected svg: d3.Selection<any>;
	
	/** Flag to indicate if the app is in test mode. */
	protected testMode: boolean = false;
	
	
	//// Private Global Variables. */
	
	/** Regular expression for just alpha-numeric characters. */
	private pattern: RegExp = /[^a-zA-Z0-9 ]/g;
	
	
	//// Constructor. ////

	/**
	 * Initialise a SynergyMeshApp object.
	 * 
	 * @param {string} root The URL root of the page.
	 * @param {boolean} testMode Flag to indicate if the app is in test mode.
	 */
	public constructor(rootPath: string = '', testMode: boolean = false) {
		
		// Enable touch emulator.
		TouchEmulator();
		
		// Store root.
		this.rootPath = rootPath;		
			
		// Store test mode.
		this.testMode = testMode;
			
		// Get values from config.
		Config.getConfig(testMode, this.buildAppStarter.bind(this));
			
	}
	
	/**
	 * Put in place listeners for building the app with.
	 */
	private buildAppStarter(): void{
		
		// Check is not in test mode.
		if (!this.testMode) {
			
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
				
		} else {
			
			// Disable networking.
			Networking.setEnabled(false);
			
			// Trigger the app running.
			this.startAppEnvironment();
				
		}
		
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
	
	
	//// Protected Methods. ////
	
	/**
	 * Add the contents specific to this app to override.
	 */
	protected addContents() {}
	
	/**
	 * Add listeners for teacher control messages from the server.
	 */
	protected addTeacherControlListeners(): void {
		
		// Build hidden freeze block. 
		let freezeBlock = this.svg.append('rect');
		freezeBlock.attr('id', 'freeze-block');
		freezeBlock.attr('width', this.vizWidth);
		freezeBlock.attr('height', this.vizHeight);
		freezeBlock.style('visibility', 'hidden');
		
		// Set up freeze listener.
		Networking.listenForMessage(CommonNetworkEvents.FREEZE, function() {
			freezeBlock.each(function(){
				this.parentNode.appendChild(this);
			});
			freezeBlock.style('visibility', 'visible');
		});
		
		// Set up unfreeze listener.
		Networking.listenForMessage(CommonNetworkEvents.UNFREEZE, function() {
			freezeBlock.style('visibility', 'hidden');
		});
			
	}
	
	/**
	 * Set up the networking connection.
	 */
	protected establishNetworking(): void {
	
		// Get host and port from config.
		let host = Config.getConfigValue(Config.SERVER_HOST);
		let port = Config.getConfigValue(Config.SERVER_PORT);
		
		// Set debugging if needed.
		if (Config.getConfigValue(Config.NETWORK_DEBUGGING)) {
			Networking.debug = true;
		}
		
		// Announce presence to server.
		Networking.establishConnection(host, port, this.sessionId, this.role, this.appName);
	
	}
	
	/**
	 * Function to be called after initial setup to indicate that the app is ready.
	 */
	protected ready() {
		this.isReady = true;
	}
	
}
