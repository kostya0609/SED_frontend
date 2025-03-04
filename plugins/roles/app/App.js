import { routes } from '@/plugins/roles/pages';
import { USE_BACK_BUTTON_KEY, USE_ACTION_BUTTONS_KEY, API_OPTIONS_KEY, DOCUMENTS_KEY } from '@/plugins/roles/shared/symbols';

export default {
	/**
	 * @param {import('vue').App} app
	 * @param {{
	 *  API: {
	 *      DEV_URL: string
	 *      PROD_URL: string
	 *  }
	 * 
	 * registerRoutes: (routes: any[]) => void
	 * prefix: ?string
	 * useBackButton: (any) => void
	 * 
	 * documents?: {
	 *  getDocumentsByStaticRole: (role_id: number) => Promise<any[]>
	 *  getDocumentsByDynamicRole: (role_id: number) => Promise<any[]>
	 * 
	 *  transform: (document: any) => { id: number, title: string, is_active: boolean  }
	 * }
	 * }} options 
	 * 
	 * @returns {void}
	*/
	install(app, { registerRoutes, prefix, useBackButton, useActionButtons, ...options }) {
		options.API = options.API || {};
		registerRoutes(routes, prefix);

		app.provide(USE_BACK_BUTTON_KEY, useBackButton);
		app.provide(USE_ACTION_BUTTONS_KEY, useActionButtons);
		app.provide(API_OPTIONS_KEY, options.API);
		app.provide(DOCUMENTS_KEY, options.documents);
	}
};