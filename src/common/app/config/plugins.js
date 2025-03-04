import ElementPlus from 'element-plus';
import { Roles } from '@/plugins/roles';
import Access from '@/plugins/access';
import { BsiTablePlugin } from '@/plugins/bsi-table';

import { VDG3 } from '@/plugins/vdg3';
import { gridInitData } from '@/common/app/config/gridInitData.js'

import { useBackButton, useActionButtons } from '@/plugins/menu';
import { ProcessPlugin } from '@/plugins/process';
import locale from 'element-plus/es/locale/lang/ru';
import { router, menuPlugin, registerRoutes } from '@/common/app/providers';
import { CkeditorPlugin } from '@ckeditor/ckeditor5-vue';
import { ApprovalRoutesPlugin } from '@/plugins/approval-routes';
import { DocumentTemplateRepo } from '@/document-routes/document-template/entities/document-template';

const API_HOST = process.env.NODE_ENV == 'production' ? `${window.location.origin + (window._SED_TEST ? '/api-test' : '/api')}` : import.meta.env.VITE_HOST;

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
		plugin: ProcessPlugin,
		params: {
			API: { DEV_URL: import.meta.env.VITE_HOST, PROD_URL: API_HOST },
			isDebug: true,
			module: 'SED',
		},
	},
	{
		plugin: Roles,
		params: {
			API: { DEV_URL: import.meta.env.VITE_HOST, PROD_URL: API_HOST },
			registerRoutes,
			prefix: '/admin',
			useBackButton,
			useActionButtons,

			documents: {
				getDocumentsByStaticRole: async (role_id) => {
					return DocumentTemplateRepo.getDocumentsByStaticRole(role_id);
				},
				getDocumentsByDynamicRole: async (role_id) => {
					return DocumentTemplateRepo.getDocumentsByDynamicRole(role_id);
				},

				transform: (documents) => documents.map(document => ({
					id: document.id,
					title: document.title,
					is_active: document.is_active,
					link: `/sed/admin/document-routes/document-template/detail/${document.id}`,
				})),
			},
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
	},
	{
		plugin: CkeditorPlugin,
		params: {},
	},
	{
		plugin: ApprovalRoutesPlugin,
		params: {
			API: { DEV_URL: import.meta.env.VITE_HOST, PROD_URL: API_HOST },
			userId: window._userId ?? 14317,
		},
	},

];
