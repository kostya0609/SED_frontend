import ListGroup from "@/plugins/access/pages/group/list.vue";
import AddGroup from "@/plugins/access/pages/group/add.vue";
import EditGroup from "@/plugins/access/pages/group/edit.vue";

import ListRight from "@/plugins/access/pages/right/list.vue";
import AddRight from "@/plugins/access/pages/right/add.vue";

import ListAdditionalRight from "@/plugins/access/pages/additional_right/list.vue";
import AddAdditionalRight from "@/plugins/access/pages/additional_right/add.vue";

import ListModule from "@/plugins/access/pages/module/list.vue";
import AddModule from "@/plugins/access/pages/module/add.vue";

import {lIST_GROUP_KEY} from "@/plugins/access/shared/symbols";

/**
 * @type {import('vue-router').RouteRecordRaw}
 */
export const routes = [
	{
		path: '/module',
		children: [
			{
				path: 'list',
				name: 'listModule',
				component: ListModule,
			},
			{
				path: 'add',
				name: 'addModule',
				component: AddModule,
			},
			{
				path: 'edit/:id',
				name: 'editModule',
				component: AddModule,
			}
		]
	},
	{
		path : '/group',
		children: [
			{
				path: 'list',
				name: 'listGroup',
				//name: lIST_GROUP_KEY,
				component: ListGroup,
			},
			{
				path: 'add',
				name: 'addGroup',
				component: AddGroup,
			},
			{
				path: 'edit/:id',
				name: 'editGroup',
				component: EditGroup,
			},
		],
	},
	{
		path: '/right',
		children: [
			{
				path: 'list',
				name: 'listRight',
				component: ListRight,
			},
			{
				path: 'add',
				name: 'addRight',
				component: AddRight,
			},
			{
				path: 'edit/:id',
				name: 'editRight',
				component: AddRight,
			},
		],
	},
	{
		path: '/additional-right',
		children: [
			{
				path: 'list',
				name: 'listAdditionalRight',
				component: ListAdditionalRight,
			},
			{
				path: 'add',
				name: 'addAdditionalRight',
				component: AddAdditionalRight,
			},
			{
				path: 'edit/:module/:client_id',
				name: 'editAdditionalRight',
				component: AddAdditionalRight,
			},
		],
	}
];