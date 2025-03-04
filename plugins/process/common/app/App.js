import { Process } from "@/plugins/process/process";
import { Interaction } from '@/plugins/process/interaction';
import { ProcessProvider } from '@/plugins/process/common/components/process-provider';
import { useInitRepositories } from '@/plugins/process/common/shared/repositories';

export const App = {
	/**
	 * @param {any} app 
	 * @param {{
	 *  API: {
	 *      DEV_URL: string
	 *      PROD_URL: string
	 *  }
	 *  isDebug: boolean
	 *  module: string
	 * }} options 
	 * 
	 * @returns {void}
	 */
	install(app, options = {}) {
		options.API = options.API || {};
		options.isDebug = options.isDebug || false;

		app.component('Process', Process);
		app.component('Interaction', Interaction);
		app.component('ProcessProvider', ProcessProvider);

		app.provide('useRepo', useInitRepositories(options.API));
		app.provide('isDebug', options.isDebug);
		app.provide('module', options.module);
	}
};