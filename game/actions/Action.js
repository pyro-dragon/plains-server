class Action {
	constructor(
		displayName,
		description,
		duration,
		index,
		bannedActions,
		performAction
	) {
		this.displayName = displayName; // The name to display in the UI
		this.description = description; // The description of the action
		this.duration = duration; // The length of time the action will take in seconds
		this.index = index; // The uniquely identifying index to tie the action to the server side
		this.bannedActions = bannedActions; // The index of actions not allowed while this action is happening
		this.performAction = performAction; // The action function to perform (after the duration has been concluded)
	}
}
