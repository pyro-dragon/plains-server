class Utils {
	static jsDateToUtc(dateObject) {
		return Math.round(new Date().getTime() / 1000);
	}

	static utcToJsDate(utcDate) {
		return new Date(unix_timestamp * 1000);
	}

	// Safely call a function that may or may not have been set
	static safelyCall(unsafeFunction) {
		if (typeof unsafeFunction === "function") {
			return unsafeFunction;
		} else {
			return () => {};
		}
	}
}

module.exports = Utils;