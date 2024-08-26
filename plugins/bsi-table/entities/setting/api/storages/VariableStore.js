export class VariableStore {
	#store = {};

	async get(moduleName, tableId, userId) {
		const hasData = await this.has(moduleName, tableId, userId);

		if (!hasData) {
			return null;
		}

		return this.#store[moduleName][tableId][userId];
	}

	async save({ moduleName, tableId, userId, data }) {
		this.#store[moduleName] = this.#store[moduleName] || {};
		this.#store[moduleName][tableId] = this.#store[moduleName][tableId] || {};
		this.#store[moduleName][tableId][userId] = data;
	}

	async has(moduleName, tableId, userId) {
		return !!this.#store[moduleName] && !!this.#store[moduleName][tableId] && !!this.#store[moduleName][tableId][userId];
	}

	async debug() {
		console.log('Variable store debug state', this.#store);
		return this.#store;
	}
}