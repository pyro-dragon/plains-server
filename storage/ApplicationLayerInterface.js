class ApplicationLayerInterface {
	authenticateUser(username, password) {}
	getComodities() {}
	getPlaces() {}
	getPlace(placeId) {}
	getConnectedPlaces(travelNode) {}
	getStores() {}
	getStore(storeId) {}
}

module.exports = ApplicationLayerInterface;
