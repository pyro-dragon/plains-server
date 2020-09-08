const ActionInstance = require("./actions/ActionInstance");

// The main game loop
class Game {
	constructor() {
		this.actions = [];
		this.actions.push(
			new Action("Test Action", "A test action", 1000, "0", [], () => {
				console.log("Test action completed");
			})
		);

		this.activeActions = new Map();
	}

	get actions() {
		return [...this.actions];
	}

	get actionList() {
		return this.actions.map((action) => {
			return {
				name: action.displayName,
				description: action.description,
				index: action.index,
			};
		});
	}

	activateAnAction(action, clanId) {
		const newActionInstance = new ActionInstance(action, clanId);

		newActionInstance.intiateAction(
			this._concludeAction,
			null,
			this._handleActionError
		);

		this._safelyAddAction(newActionInstance, clanId);
	}

	_handleActionError(error, action, clanId) {
		console.error(error);

		this._safelyRemoveAction(action, clanId);
	}

	_concludeAction(action, clanId) {
		// Remove the action
		this._safelyRemoveAction(action, clanId);
	}

	// Remove actions safely
	_safelyRemoveAction(actionInstance, clanId) {
		// Stop the action timeout
		clearTimeout(actionInstance.actionTimer);

		// Try and get any existing actions
		const clanActions = this.activeActions.get(clanId);

		// Check to see if there is an entry for the clan and its an array
		if (clanActions && Array.isArray(clanActions)) {
			//Find the index of the action
			const actionIndex = clanActions.indexOf(actionInstance);

			// Remove the action
			if (actionIndex >= 0) {
				clanActions.splice(actionIndex, 1);
			}
		}

		// Clear the clan actions entry if the array is empty or no array exists
		if (!clanActions || !clanActions.length) {
			this.activeActions.delete(clanId);
		}
	}

	// Add an actionInstance to the list safely
	_safelyAddAction(actionInstance, clanId) {
		// Try and get any existing actions
		const clanActions = this.activeActions.get(clanId);

		// Check to see if there is an entry for the clan and its an array
		if (clanActions && Array.isArray(clanActions)) {
			// Add the action
			clanActions.push(actionInstance);
		} else {
			// No clan or actions, intiate them
			this.activeActions.set(clanId, [actionInstance]);
		}
	}
}

module.exports = Game;