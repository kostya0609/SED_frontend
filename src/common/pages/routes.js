import AdminPage from './AdminPage.vue';
import NotFoundPage from './NotFoundPage.vue';

/**
 * @type {import('vue-router').RouteRecordRaw}
 */
const adminRoutes = {
	path: '/admin',
	children: [
		{
			path: 'document-routes',
			component: AdminPage,
		},
		{
			path: 'rights',
			component: AdminPage,
		},
		{
			path: 'document-routes/structure',
			component: AdminPage,
		},
	]
};

/**
 * @type {import('vue-router').RouteRecordRaw[]}
 */
export const routes = [
	adminRoutes,
	{
		path: '/:pathMatch(.*)*',
		component: NotFoundPage,
	},
];