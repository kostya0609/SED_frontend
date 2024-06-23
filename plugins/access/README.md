# Плагин прав

## Установка

```bash
git submodule add https://gitlab.bitrix.bsi.local/common/plugin_access.git ./src/plugins/access
```

## Обновление

```bash
cd ./src/plugins/access
```

```bash
git checkout main
```

```bash
git pull
```

## Настройки плагина

| Название | Тип         | Описание                                                                                                                                                                                                                                                                                                                                                                                                  |
| ---------------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| global           | boolean        | Режим работы, если true - включается режим работы со всеми модулями, появляется функционал для работы с модулями. Если false (это базовый режим) то работаем с конкретным модулем, который указан в параметре module при регистрации |
| module           | строка   | Название модуля с которым будет работать плагин. Если плагин внедряется с обычный модуль то всегда параметр global = false и module = 'имя модуля'                                                                                                                                                           |
| registerRoutes   | функция | Регистрирует маршруты плагина. Пример функции registerRoutes можно посмотреть ниже или в проекте SED.                                                                                                                                                                                                                                     |
| prefix           | строка   | Префикс маршрута плагина                                                                                                                                                                                                                                                                                                                                                                    |
| useBackButton    | функция | Добавляет в меню кнопку "Вернуться назад". Функция useBackButton импортируется из плагина меню. Если в проекте нет плагина меню, то нужно самому реализовать данную функцию                                                                                                     |

## Пример настройки плагина

```js
import Access from '@/plugins/roles';

app.use(Access , {
	global: false,
	module: 'SED',
	registerRoutes,
	prefix: '/admin',
	useBackButton,
});
```

## Пример реализации функции registerRoute

```js
/** 
 * Пример функции регистрации маршрутов, например находится в папке проекта src/providers
 */

import { router } from '@/router';

const registerRoutes = (routes, prefix = '') => {
	routes.forEach(route => {
		router.addRoute({ ...route, path: `${prefix || ''}${route.path}` });
	});
};
```

## Добавление пунктов меню для плагина

В настройках меню необходимо в массив const = adminMenu [ ] добавить два пункт меню для работы с правами и описать отдельно сущность `accessMenu` для ключа  `replaceMenu`

```js
 export const adminMenu = [
	{
		title: 'Управление правами',
		path: '/admin/access/group/list',
		replaceMenu: accessMenu,
	},
];

export const accessMenu = [
	//ниже пункт меню если при инициализации плагина был установлен параметр global = true
	{
		title: 'Модули',
		path: '/admin/access/module/list',
		rights: ['full_access'],
		buttons: [
			{
				title: 'Создать группу',
				path: '/admin/access/module/add',
			},
			{
				icon: 'Back',
				path: '/admin/document-routes',
				type: 'default'
			},
		],
	},
	{
		title: 'Группы',
		path: '/admin/access/group/list',
		rights: ['full_access'],
		buttons: [
			{
				title: 'Создать группу',
				path: '/admin/access/group/add',
			},
			{
				icon: 'Back',
				path: '/admin/document-routes',
				type: 'default'
			},
		],
	},
	{
		title: 'Права',
		path: '/admin/access/right/list',
		rights: ['full_access'],
		buttons: [
			{
				title: 'Создать право',
				path: '/admin/access/right/add',
			},
			{
				icon: 'Back',
				path: '/admin/document-routes',
				type: 'default'
			},
		],
	},
	{
		title: 'Расширенные права',
		path: '/admin/access/additional-right/list',
		rights: ['full_access'],
		buttons: [
			{
				title: 'Создать Право',
				path: '/admin/access/additional-right/add',
			},
			{
				icon: 'Back',
				path: '/admin/document-routes',
				type: 'default'
			},
		],
	},
];
```

## Пример использования в модуле

При инициализации приложения сделать запрос на сервер для получения прав пользователя :

    - пример адреса  https://bitrix.bsi.local/api/accesses/v1/users/rights

    - в качестве payload передать объект`{ module : 'имя модуля', user_id : ID пользователя, token : 'если необходим' }`

Ответ от сервера будет следующий, в примере

    -`rights` это массив прав названий прав которые есть у пользователя в этом модуле

    -`additional_rights`  это объект с описанием расширенных прав.

```js
data : {
	rights : ["full_access"],
	additional_rights : {
				client_id : 14317,
				creator : "Кривопуск Константин Владимирович",
				date_create : "19-03-2024",
				name : "Кривопуск Константин Владимирович",
				departments : [
						{
							full_access : 0,
							hierarchy : 1,
							id : 1373,
							name : "НОТ - Направление оптовой торговли",
						}
				],
				users : [
						{
							full_access : 1,
							id : 14287,
							name : "Самусев Сергей Владимирович",
						}
					]
			  }


},
success : true
```
