import CreateReviewPage from './CreateReviewPage.vue';
import EditReviewPage from './EditReviewPage.vue';
import DetailReviewPage from './DetailReviewPage.vue';

/**
 * @type {import('vue-router').RouteRecordRaw[]}
 */
export const routes = [
	{
		path: '/documents/review/create/:parent_id?',
		component: CreateReviewPage,
	},
	{
		path: '/documents/review/edit/:id',
		component: EditReviewPage,
	},
	{
		path: '/documents/review/detail/:id',
		component: DetailReviewPage,
	},
];