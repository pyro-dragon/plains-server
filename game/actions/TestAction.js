class TestAction extends Action {
	constructor() {
		super("Test Action", "A test action", 1000, "0", [], () => {
			console.log("Test action completed");
		});
	}
}
