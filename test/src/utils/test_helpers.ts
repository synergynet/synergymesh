/**
 * Class with static methods for helping run unit tests.
 */
export class TestHelpers {
	
	/** The id of the div for holding elements generated for tests. */
	private static TEST_CONTENTS_DIV = 'test-contents';
	
	/**
	 * Replaces the inner HTML of the test contents div and sets it with new HTML. 
	 * 
	 * @param {string} newContents The HTML to replace the inner HTML of the test contents div with.
	 */
	public static setTestHtml(newContents: string): void {
		let testContentsDiv = document.getElementById(TestHelpers.TEST_CONTENTS_DIV);
		testContentsDiv.innerHTML = newContents;
	}
	
}