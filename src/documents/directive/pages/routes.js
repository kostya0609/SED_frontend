import CreateDirectivePage from './CreateDirectivePage.vue';
import EditDirectivePage from './EditDirectivePage.vue';
import DetailDirectivePage from './DetailDirectivePage.vue';

/**
 * @type {import('vue-router').RouteRecordRaw[]}
 */
export const routes = [
	{
		path: '/documents/directive/create/:parent_id?',
		component: CreateDirectivePage,
	},
	{
		path: '/documents/directive/edit/:id',
		component: EditDirectivePage,
	},
	{
		path: '/documents/directive/detail/:id',
		component: DetailDirectivePage,
	},
];