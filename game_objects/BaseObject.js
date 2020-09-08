class BaseObject {
	id = "";
	rev;

	constructor (id, rev) {
		this.id = id;
		this.rev = rev;
	}

	get _id() {
		return this.id;
	}

	get _rev() {
		return this.rev
	}

	set _id(id) {
		this.id = id;
	}

	set _rev(rev) {
		this.rev = rev;
	}
}