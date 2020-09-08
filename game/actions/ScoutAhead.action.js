class ScoutAheadAction extends Action {
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
		super(
			"Scout ahead",
			"Send scouts on ahead to check the area for enemies or points of interest.",
			86400,
			"0",
			[],
			() => {
				// Note: monsters, and treasures are not dependent on finding dungeons, they just add more oppotunities for these
				// Get people and equipment involved.
				// Get the landscape involved.
				// Get any relevent world events.
				// Check for nearby players.
				// Roll chance of finding a dungeon
				// Roll chance of finding monsters/bandits
				// Roll chance of finding treasure
				// Calculate fight losses
				// Return survivors with their equipment, treasure and information
			}
		);
	}
}
