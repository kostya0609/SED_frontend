import ListRoutePage from '@document-routes/document-route/pages/ListRoutePage.vue';
import CreateRoutePage from '@document-routes/document-route/pages/CreateRoutePage.vue';
import EditRoutePage from '@document-routes/document-route/pages/EditRoutePage.vue';
import DetailRoutePage from '@document-routes/document-route/pages/DetailRoutePage.vue';

import SelectRouteElementPage from '@document-routes/document-template/pages/SelectRouteElementPage.vue';

import CreateTemplatePage from '@document-routes/document-template/pages/CreateTemplatePage.vue'
import EditTemplatePage from '@document-routes/document-template/pages/EditTemplatePage.vue'
import DetailTemplatePage from '@document-routes/document-template/pages/DetailTemplatePage.vue'

import TreePartitionPage from '@document-routes/partition/pages/TreePartitionPage.vue';

/**
 * @type {import('vue-router').RouteRecordRaw[]}
 */
export const routes = [
	{
		path: '/admin/document-routes/list',
		component: ListRoutePage,
		name: 'listDocumentRoutePage'
	},
	{
		path: '/admin/document-routes/create',
		component: CreateRoutePage,
		name: 'createDocumentRoutePage'
	},
	{
		path: '/admin/document-routes/edit/:id',
		component: EditRoutePage,
		name: 'editDocumentRoutePage'
	},
	{
		path: '/admin/document-routes/detail/:id',
		component: DetailRoutePage,
		name: 'detailDocumentRoutePage'
	},
	{
		path: '/admin/document-routes/document-template/select-route-element/:routeId',
		component: SelectRouteElementPage,
		name: 'selectRouteElementPage'
	},	
	{
		path: '/admin/document-routes/document-template/create/:type/:routeId',
		component: CreateTemplatePage,
		name: 'createTemplatePage'
	},
	{
		path: '/admin/document-routes/document-template/edit/:id',
		component: EditTemplatePage,
		name: 'editTemplatePage'
	},
	{
		path: '/admin/document-routes/document-template/detail/:id',
		component: DetailTemplatePage,
		name: 'detailTemplatePage'
	},

	{
		path: '/admin/document-routes/partition/tree',
		component: TreePartitionPage,
		name: 'treePartitionPage'
	},
];