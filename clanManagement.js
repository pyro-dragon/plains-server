const Gnoll = require("./Gnoll");
const Gender = require("./genders.enum");

const nano = require("nano")(process.env.DB_URL);
const mainDb = nano.db.use("plains");

class Clan {
	constructor(name) {
		this.name = name;

		this.type = "clan";
		this.memberIds = [];
		this.vehicleIds = [];
		this.money = 0;
		this.leader = "";
		this.location = "";
		this.alerts = [];
		this.log = [
			{
				type: "info",
				timestamp: +new Date(),
				message: "Clan founded!",
			},
		];
	}
}

// Account management functionality
class ClanManager {
	constructor() {}

	static async createNewClan() {
		// TODO: Create a name generator

		// Create the leader
		const leader = new Gnoll("Raziel", Gender.FEMALE, 28);
		let response = await mainDb.insert(leader);

		if (!response.ok) {
			Promise.reject(new Error(response));
		}

		// Keep the revision ID
		leader._rev = response.rev;

		// Create clan
		const clan = new Clan("New Clan");
		clan.leader = response.id;

		// Save the clan
		response = await mainDb.insert(clan);

		if (!response.ok) {
			Promise.reject(new Error(response));
		}

		// Update and save the leader
		leader.clanId = response.id;
		response = await mainDb.insert(leader);

		return Promise.resolve({ clanId: leader.clanId });
	}
}

module.exports = ClanManager;
