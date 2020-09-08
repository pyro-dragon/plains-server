const couchAli = require("./couchdb/ApplictionLayer");

class VirtualStorageLayer {

	constructor(applicaionLayerInterface) {
		console.log("constructing...")
		console.log(applicaionLayerInterface);
		this.ali = applicaionLayerInterface;
	}

	authenticateUser(username, password) {
		return this.ali.authenticateUser(username, password);
	}

	getComodities() {}
	getPlaces() {}
	getPlace(placeId) {}
	getConnectedPlaces(travelNode) {}
	getStores() {}
	getStore(storeId) {}
}

module.exports = new VirtualStorageLayer(couchAli);