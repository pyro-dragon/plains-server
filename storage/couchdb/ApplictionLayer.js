const dbLayer = require("./DatabaseLayer");
ApplicationLayerInterface = require("../ApplicationLayerInterface");

class ApplictionLayer extends ApplicationLayerInterface {
	authenticateUser(username, password) {
		return dbLayer.authenticateUser(username, password);
	}
	getComodities() {}
	getPlaces() {}
	getPlace(placeId) {}
	getConnectedPlaces(travelNode) {}
	getStores() {}
	getStore(storeId) {}
}

module.exports = new ApplictionLayer();
