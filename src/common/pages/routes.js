import SubusersPage from './SubusersPage.vue';

/**
 * @type {import('vue-router').RouteRecordRaw}
 */
const SubusersRoutes = {
	path: '/admin/subusers',
	component: SubusersPage,	
};

/**
 * @type {import('vue-router').RouteRecordRaw[]}
 */
export const routes = [
	SubusersRoutes,
];