import ElementPlus from 'element-plus';
import { Roles } from '@/plugins/roles';
import { DocumentRoutes } from '@/plugins/document-routes';
import Access from '@/plugins/access';

import { VDG3 } from '@/plugins/vdg3';
import {gridInitData} from '@/common/app/config/gridInitData.js'

import { useBackButton } from '@/plugins/menu';
import BusinessProcess from '@/plugins/process';
import locale from 'element-plus/es/locale/lang/ru';
import { router, menuPlugin, registerRoutes } from '@/common/app/providers';

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
			API: { DEV_URL: import.meta.env.VITE_HOST },
		},
	},
	{
		plugin: Roles,
		params: {
			API: { DEV_URL: import.meta.env.VITE_HOST },
			registerRoutes,
			prefix: '/admin',
			useBackButton
		},
	},
	{
		plugin: Access,
		params: { 
			API: { DEV_URL: import.meta.env.VITE_HOST },
			global: false, 
			module: 'SED',
			registerRoutes, 
			prefix: '/admin/access',
			useBackButton, 			
		},
	},
	{
		plugin: DocumentRoutes,
		params: {
			API: { DEV_URL: import.meta.env.VITE_HOST },
			registerRoutes,
			prefix: '/admin',
			useBackButton
		},
	},
	{
		plugin: router,
		params: {},
	},
	{
		plugin: VDG3,
		params: {
			API: { DEV_URL: import.meta.env.VITE_HOST },
			initData: gridInitData,
			userId: window._userId ?? 14317,
			module: 'SED'
		},
	},
];
