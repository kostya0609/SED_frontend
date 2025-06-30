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
				path: '/sed/admin/document-routes/list-v2',
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
				path: '/sed/admin/document-routes/list-v2',
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
				path: '/sed/admin/document-routes/list-v2',
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
		path: '/sed/admin/document-routes/list-v2',
		rights: ['full_access'],
		buttons: [],
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
		path: '/sed/admin/roles/statics-v2',
		buttons: [],
	},	
	{
		title: 'Управление правами',
		path: '/sed/admin/access/group/list',
		replaceMenu: accessMenu,
	},
	{
		title: 'Отчет',
		path: '/sed/admin/report',
		buttons: [
			{
				icon: 'Back',
				path: '/sed/',
				type: 'default'
			},
		],
	},
	{
		title: 'Заместители',
		path: '/sed/admin/subusers',
		buttons: [
			{
				icon: 'Back',
				path: '/sed/',
				type: 'default'
			},
		],
	}
];


/**
 * @type {import('@/plugins/menu/types').Menu}
 */
export const menu = [
	{
		title: 'СЭД',
		path: '/sed/',
		dropdown: {
			title: 'Создать документ',
			items: [
				{
					title: 'ЭСЗ',
					path: '/sed/documents/esz/create',
				},
				{
					title: 'Поручение',
					path: '/sed/documents/directive/create',
				},
				{
					title: 'Ознакомление',
					path: '/sed/documents/review/create',
				},
			],
		},
	},
	{
		title: 'Требует реакции',
		path: '/sed/need-action',
		count: 0,
		dropdown: {
			title: 'Создать документ',
			items: [
				{
					title: 'ЭСЗ',
					path: '/sed/documents/esz/create',
				},
				{
					title: 'Поручение',
					path: '/sed/documents/directive/create',
				},
				{
					title: 'Ознакомление',
					path: '/sed/documents/review/create',
				},
			],
		},
	},
	{
		title: 'Требует реакции (зам.)',
		path: '/sed/need-action-subuser',
		count: 0,
		dropdown: {
			title: 'Создать документ',
			items: [
				{
					title: 'ЭСЗ',
					path: '/sed/documents/esz/create',
				},
				{
					title: 'Поручение',
					path: '/sed/documents/directive/create',
				},
				{
					title: 'Ознакомление',
					path: '/sed/documents/review/create',
				},
			],
		},
	},
	{
		title: 'Администрирование',
		path: '/sed/admin/document-routes/list-v2',
		rights: ['full_access'],
		replaceMenu: adminMenu,
	},
];
