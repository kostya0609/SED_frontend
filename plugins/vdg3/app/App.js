import '@/plugins/vdg3/css/style.css'
import '@/plugins/vdg3/css/color.css'
import { useGridsData, useGrids } from '../'

export default {
	/**
	* @param {import('vue').App} app
	* @param {{
	*  API: {
	*      DEV_URL: string
	*      PROD_URL: string
	*  };
	* initData:{object[]};
	* userId:{number};
	* module:{number};
	* }} options 
	* 
	* @returns {void}
	*/
	install(app, { ...options }) {

		options.API = options.API || { PROD_URL: null, DEV_URL: null };
		options.initData = options.initData || [{ name: 'test grid', header: {}, context: [] }];
		options.userId = options.userId || null;
		options.module = options.module || null;

		const { initGridsData } = useGridsData();
		const { initGrids } = useGrids();

		initGridsData(options.initData);
		initGrids(options.initData, options.userId, options.API, options.module);

	}
};