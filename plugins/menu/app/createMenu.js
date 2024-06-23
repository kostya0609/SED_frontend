import { ref } from 'vue';

export const createMenu = (defaultMenu) => {
	const menu = ref(defaultMenu);
	const actionButtons = ref([]);

	return {
		/**
		 * @param {import('vue').App<any>} app 
		 * @param {{ [key: string]: any}} options 
		 */
		install(app, options) {
			app.provide('menu', menu);
			app.provide('actionButtons', actionButtons);
		}
	};
};