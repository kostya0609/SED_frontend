import { API_OPTIONS_KEY, USER_ID_KEY } from '@/plugins/approval-routes/shared/symbols';

export default {
	/**
	* @param {import('vue').App} app
	* @param {{
	*  API: {
	*      DEV_URL: string
	*      PROD_URL: string
	*  };
	*  userId: number;
	* }} options 
	* 
	* @returns {void}
	*/
	install(app, options = {}) {
		options.API = options.API || { PROD_URL: null, DEV_URL: null };

		app.provide(API_OPTIONS_KEY, options.API);
		app.provide(USER_ID_KEY, options.userId);
	}
};