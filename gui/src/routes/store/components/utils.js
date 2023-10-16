export function isJSON (item) {
	let value = typeof item !== 'string' ? JSON.stringify(item) : item;
	try {
		value = JSON.parse(value);
	} catch (e) {
		return false;
	}

	return typeof value === 'object' && value !== null;
}

export function isTask (items) {
	if (!Array.isArray(items)) {
		return false;
	}
	for (let i of items) {
		if (typeof i.name != 'string') {
			return false;
		}
		if (typeof i.before != 'string') {
			return false;
		}
		if (typeof i.after != 'string') {
			return false;
		}
		if (!Array.isArray(items)) {
			return false;
		}
		if (typeof i.sub != 'object') {
			return false;
		}
	}
	return true;
}
