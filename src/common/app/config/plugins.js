import ElementPlus from 'element-plus';
import { Roles } from '@/plugins/roles';
import Access from '@/plugins/access';
import { BsiTablePlugin } from '@/plugins/bsi-table';

import { VDG3 } from '@/plugins/vdg3';
import { gridInitData } from '@/common/app/config/gridInitData.js'

import { useBackButton } from '@/plugins/menu';
import BusinessProcess from '@/plugins/process';
import locale from 'element-plus/es/locale/lang/ru';
import { router, menuPlugin, registerRoutes } from '@/common/app/providers';

const API_HOST = !window._SED_TEST ? (window.location.origin + '/api') : 'https://api2.bsi.local/api-test';

/**
 * @type {import("@/common/shared/types").PluginItem[]}
 */
export const plugins = [
	{
		plugin: ElementPlus,
		params: {
			locale,
		},
	},
	{
		plugin: menuPlugin,
		params: {},
	},
	{
		plugin: BusinessProcess,
		params: {
			API: { DEV_URL: import.meta.env.VITE_HOST, PROD_URL: API_HOST },
			isDebug: true,
		},
	},
	{
		plugin: Roles,
		params: {
			API: { DEV_URL: import.meta.env.VITE_HOST, PROD_URL: API_HOST },
			registerRoutes,
			prefix: '/admin',
			useBackButton
		},
	},
	{
		plugin: Access,
		params: {
			API: { DEV_URL: import.meta.env.VITE_HOST, PROD_URL: API_HOST },
			global: false,
			module: 'SED',
			registerRoutes,
			prefix: '/admin/access',
			useBackButton,
		},
	},
	{
		plugin: router,
		params: {},
	},
	{
		plugin: VDG3,
		params: {
			API: { DEV_URL: import.meta.env.VITE_HOST, PROD_URL: API_HOST },
			initData: gridInitData,
			userId: window._userId ?? 14317,
			module: 'SED'
		},
	},
	{
		plugin: BsiTablePlugin,
		params: {
			API: { DEV_URL: import.meta.env.VITE_HOST, PROD_URL: API_HOST },
			userId: window._userId ?? 14317,
			module: 'SED'
		},
	}
];
