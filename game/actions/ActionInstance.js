const Utils = require("../../utils/utils");

class ActionInstance {
	constructor(action, clanId) {
		this.action = action;
		this.initTimeCode = 0;
		this.clanId = clanId;
	}

	intiateAction(actionConcludedCallback, initActionCallback, errorCallback) {
		this.initTimeCode = Utils.jsDateToUtc(new Date());
		Utils.safelyCall(initActionCallback)(this.action);

		// Store the timeout object so it can be cancelled later
		this.actionTimer = setTimeout(() => {
			try {
				Utils.safelyCall(this.action.performAction)(
					this.action,
					this.clanId
				);
			} catch (error) {
				Utils.safelyCall(errorCallback)(
					error,
					this.action,
					this.clanId
				);
			}

			Utils.safelyCall(actionConcludedCallback)(this.action, this.clanId);
		}, action.duration);
	}
}
