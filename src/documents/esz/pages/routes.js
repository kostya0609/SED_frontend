import CreateESZPage from './CreateESZPage.vue';
import EditESZPage from './EditESZPage.vue';
import DetailESZPage from './DetailESZPage.vue';

/**
 * @type {import('vue-router').RouteRecordRaw[]}
 */
export const routes = [
	{
		path: '/documents/esz/create',
		component: CreateESZPage,
	},
	{
		path: '/documents/esz/edit/:id',
		component: EditESZPage,
	},
	{
		path: '/documents/esz/detail/:id',
		component: DetailESZPage,
	},
];