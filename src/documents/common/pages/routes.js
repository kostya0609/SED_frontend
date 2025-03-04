import DocumentListPage from './DocumentListPage.vue';
import SelectRouteElementPage from './SelectRouteElementPage.vue';
import NeedActionListPage from './NeedActionListPage.vue';
import TemplateRequirementsPage from './TemplateRequirementsPage.vue';

import { DOCUMENT_lIST_KEY, NEED_ACTION_lIST_KEY, NEED_ACTION_SUBUSER_LIST_KEY, SELECT_ROUTE_ELEMENT_KEY, TEMPLATE_REQUIREMENTS } from "@documents/common/shared/symbols";
import NeedActionSubuserListPage from './NeedActionSubuserListPage.vue';

/**
 * @type {import('vue-router').RouteRecordRaw[]}
 */
export const routes = [
	{
		path: '/',
		component: DocumentListPage,
		name: DOCUMENT_lIST_KEY,
	},
	{
		path: '/need-action',
		component: NeedActionListPage,
		name: NEED_ACTION_lIST_KEY,
	},
	{
		path: '/documents/select-route-element',
		component: SelectRouteElementPage,
		name: SELECT_ROUTE_ELEMENT_KEY,
	},
	{
		path: '/need-action-subuser',
		component: NeedActionSubuserListPage,
		name: NEED_ACTION_SUBUSER_LIST_KEY,
	},
	{
		path: '/document-template-requirements/:id',
		component: TemplateRequirementsPage,
		name: TEMPLATE_REQUIREMENTS,
	}
];