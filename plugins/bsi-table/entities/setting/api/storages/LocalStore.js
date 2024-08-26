export class LocalStore {
	#key = 'table-settings';

	async get(moduleName, tableId, userId) {
		const hasData = await this.has(moduleName, tableId, userId);

		if (!hasData) {
			return null;
		}

		const data = localStorage.getItem(this.#key);
		const result = JSON.parse(data);

		return result[moduleName][tableId][userId];
	}

	async save({ moduleName, tableId, userId, data }) {
		let settings = JSON.parse(localStorage.getItem(this.#key)) || {};

		if (!settings[moduleName]) {
			settings[moduleName] = {
				[tableId]: {
					[userId]: data,
				},
			};
		} else if (!settings[moduleName][tableId]) {
			settings[moduleName][tableId] = {
				[userId]: data,
			};
		} else {
			settings[moduleName][tableId][userId] = {
				...settings[moduleName][tableId][userId],
				...data
			};
		}

		localStorage.setItem(this.#key, JSON.stringify(settings));
	}

	async has(moduleName, tableId, userId) {
		const data = localStorage.getItem(this.#key);

		if (!data) return false;

		const result = JSON.parse(data);

		return !!(result[moduleName] && !!result[moduleName][tableId]) && !!result[moduleName][tableId][userId];
	}

	async debug() {
		console.log('Local store debug state', JSON.parse(localStorage.getItem(this.#key)));
		return JSON.parse(localStorage.getItem(this.#key));
	}
}