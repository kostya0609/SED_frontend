import { useInitRepositories } from "./repositories";
import Process from "@/plugins/process/components/process/Process.vue";
import ProcessProvider from "@/plugins/process/components/ProcessProvider.vue";
import Interaction from '@/plugins/process/components/interaction/Interaction.vue';

let installed = false;

export default {

	/**
	 * @param {any} app 
	 * @param {{
	 *  API: {
	 *      DEV_URL: string
	 *      PROD_URL: string
	 *  }
	 *  isDebug: boolean
	 * }} options 
	 * 
	 * @returns {void}
	 */
	install(app, options = {}) {
		if (installed) return;

		installed = true;

		options.API = options.API || {};
		options.isDebug = options.isDebug || false;

		app.component('Process', Process);
		app.component('Interaction', Interaction);
		app.component('ProcessProvider', ProcessProvider);

		app.provide('useRepo', useInitRepositories(options.API));
		app.provide('isDebug', options.isDebug);
	}
}