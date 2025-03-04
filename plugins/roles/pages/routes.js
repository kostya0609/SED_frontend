import { DynamicListPage, DynamicDetailPage, DynamicCreatePage, DynamicEditPage } from './dynamic';
import { StaticDetailPage, StaticCreatePage, StaticEditPage, StaticListPageV2 } from './static';

/**
 * @type {import('vue-router').RouteRecordRaw}
 */
export const routes = [
	{
		path: '/roles/dynamics',
		component: DynamicListPage,
		name: 'dynamicListPage',
	},
	{
		path: '/roles/dynamics/create',
		component: DynamicCreatePage,
		name: 'dynamicCreatePage',
	},
	{
		path: '/roles/dynamics/detail/:id',
		component: DynamicDetailPage,
		name: 'dynamicDetailPage',
	},
	{
		path: '/roles/dynamics/edit/:id',
		component: DynamicEditPage,
		name: 'dynamicEditPage',
	},
	{
		path: '/roles/statics-v2/:partition_id?',
		component: StaticListPageV2,
		name: 'StaticListPageV2',
	},
	{
		path: '/roles/statics/detail/:id',
		component: StaticDetailPage,
		name: 'staticDetailPage',
	},
	{
		path: '/roles/statics/create/:partition_id?',
		component: StaticCreatePage,
		name: 'staticCreatePage',
	},
	{
		path: '/roles/statics/edit/:id',
		component: StaticEditPage,
		name: 'staticEditPage',
	},
];