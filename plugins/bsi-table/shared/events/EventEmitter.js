/**
 * @typedef {'state-loaded'|'state-save'|'change-data'} Events
 */
export class EventEmitter {
	constructor() {
		this.events = {};
	}

	/**
	 * @param {Events} event 
	 * @param {() => any} listener 
	 * @returns {void}
	 */
	on(event, listener) {
		if (!(event in this.events)) {
			this.events[event] = [];
		}

		this.events[event].push(listener);
		return () => this.removeListener(event, listener);
	}

	/**
	 * 
	 * @param {Events} event 
	 * @param {() => any} listener 
	 * @returns {void}
	 */
	removeListener(event, listener) {
		if (!(event in this.events)) {
			return;
		}

		const idx = this.events[event].indexOf(listener);

		if (idx > -1) {
			this.events[event].splice(idx, 1);
		}
		if (this.events[event].length === 0) {
			delete this.events[event];
		}
	}

	/**
	 * 
	 * @param {Events} event 
	 * @param  {...any} args 
	 * @returns {void}
	 */
	emit(event, ...args) {
		if (!(event in this.events)) {
			return;
		}

		this.events[event].forEach(listener => listener(...args));
	}

	/**
	 * 
	 * @param {Events} event 
	 * @param {() => any} listener 
	 */
	once(event, listener) {
		const remove = this.on(event, (...args) => {
			remove();
			listener(...args);
		});
	}

	removeAllListeners() {
		this.events = {};
	}
}