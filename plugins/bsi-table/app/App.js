export default {

	/**
	 * @param {import('vue').App} app 
	 * @param {{ [key: string]: any}} options 
	 */
	install(app, options) {
		if (!options.module) {
			throw new Error('module is required!');
		}

		if (!options.userId) {
			throw new Error('userId is required!');
		}

		app.provide('moduleName', options.module);
		app.provide('userId', options.userId);
	}
};