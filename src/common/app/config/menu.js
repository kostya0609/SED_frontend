/**
 * @type {import('@/plugins/menu/types').Menu}
 */
export const accessMenu = [
	{
		title: 'Группы',
		path: '/sed/admin/access/group/list',
		rights: ['full_access'],
		buttons: [
			{
				title: 'Создать группу',
				path: '/sed/admin/access/group/add',
			},
			{
				icon: 'Back',
				path: '/sed/admin/document-routes',
				type: 'default'
			},
		],
	},
	{
		title: 'Права',
		path: '/sed/admin/access/right/list',
		rights: ['full_access'],
		buttons: [
			{
				title: 'Создать право',
				path: '/sed/admin/access/right/add',
			},
			{
				icon: 'Back',
				path: '/sed/admin/document-routes',
				type: 'default'
			},
		],
	},
	{
		title: 'Расширенные права',
		path: '/sed/admin/access/additional-right/list',
		rights: ['full_access'],
		buttons: [
			{
				title: 'Создать Право',
				path: '/sed/admin/access/additional-right/add',
			},
			{
				icon: 'Back',
				path: '/sed/admin/document-routes',
				type: 'default'
			},
		],
	},
];


/**
 * @type {import('@/plugins/menu/types').Menu}
 */
export const adminMenu = [

	{
		title: 'Маршруты',
		path: '/sed/admin/document-routes/list',
		rights: ['full_access'],
		buttons: [
			{
				title: 'Создать маршрут',
				path: '/sed/admin/document-routes/create',
			},
			{
				icon: 'Back',
				path: '/sed/',
				type: 'default'
			},
		],
	},
	{
		title: 'Структура маршрутов',
		path: '/sed/admin/document-routes/partition/tree',
		
		buttons: [
			{
				icon: 'Back',
				path: '/sed/',
				type: 'default'
			},
		],
	},
	{
		title: 'Динамические роли',
		path: '/sed/admin/roles/dynamics',
		buttons: [
			{
				title: 'Создать роль',
				path: '/sed/admin/roles/dynamics/create',
			},
			{
				icon: 'Back',
				path: '/sed/',
				type: 'default'
			},
		],
	},
	{
		title: 'Статичные роли',
		path: '/sed/admin/roles/statics',
		buttons: [
			{
				title: 'Создать роль',
				path: '/sed/admin/roles/statics/create',
			},
			{
				icon: 'Back',
				path: '/sed/',
				type: 'default'
			},
		],
	},
	{
		title: 'Управление правами',
		path: '/sed/admin/access/group/list',
		replaceMenu: accessMenu,
	},

];


/**
 * @type {import('@/plugins/menu/types').Menu}
 */
export const menu = [
	{
		title: 'СЭД',
		path: '/sed/',
		buttons: [
			{
				title: 'Создать документ',
				path: '/sed/documents/select-route-element',
			},
		],
	},
	{
		title: 'Требует реакции',
		path: '/sed/need-action',
		count: 0,
		buttons: [
			{
				title: 'Создать документ',
				path: '/sed/documents/select-route-element',
			},
		],
	},
	{
		title: 'Администрирование',
		path: '/sed/admin/document-routes/list',
		rights: ['full_access'],
		replaceMenu: adminMenu,
	},
];
