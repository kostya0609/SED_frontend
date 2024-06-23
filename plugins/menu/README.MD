# Плагин меню

## Установка

```bash
git submodule add https://gitlab.bitrix.bsi.local/common/plugin_menu.git ./src/plugins/menu
```

## Обновление

```bash
cd ./src/plugins/menu
```

```bash
git checkout main
```

```bash
git pull
```

## Использование

### Описать массив элементов меню приложения в menu.js по примеру:

```js
/**
 * @type {import('@/plugins/menu/types').Menu}
 */
export const menu = [
	{
		title: 'Документы',
		path: '/',
		buttons: [
			{
				title: 'Создать документ',
				path: '/documents/create',
			},
		],
	},
	{
		title: 'Требует реакции',
		path: '/need-action',
		count: 0,
		buttons: [
			{
				title: 'Создать документ',
				path: '/documents/create',
			},
		],
	},
	{
		title: 'Администрирование',
		path: '/admin',
		rights: ['full_access'],
	}
];
```

### Создать экземпляр плагина и передать меню в menuPlugin.js:

```js
import { menu } from './menu';
import { createMenu } from '@/plugins/menu';

export const menuPlugin = createMenu(menu);
```

### Зарегистрировать плагин

```js
import { menuPlugin } from './menuPlugin';

app.use(menuPlugin);
```

### Вывести главное меню в App.vue

```html
<template>
  <el-container>
    <el-main>
      <Menu :rights="['full_access']" />
      <RouterView />
    </el-main>
  </el-container>
</template>
<script setup>
import { Menu } from '@/plugins/menu';
import { RouterView } from '@/common/app/providers';
</script>
```

## Хуки

### Импорт хуков

```js
import { useMenu, useCounter, useActionButtons, useBackButton } from '@/plugins/menu';
```

### Краткое описание хуков

| Хук           | Описание                                                                                                 |
| ---------------- | ---------------------------------------------------------------------------------------------------------------- |
| useMenu          | Используется для взаимодействия с элементами меню                    |
| useCounter       | Используется для работы со счетчиком элементов меню                 |
| useActionButtons | Используется для управления дополнительными кнопками в меню |
| useBackButton    | Используется для добавления в меню кнопки "Вернуться назад"    |

### useMenu

#### Использование

```js
import { useMenu } from '@/plugins/menu';

const {	menu, hasItem, getItem, addItem, updateItem, removeItem } = useMenu();
```

#### Описание

| Метод/свойство | Описание                                                                                                                       | Примечания                                                                                                                                                                                                              |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| menu                        | Свойство, которое возвращает реактивный массив со всеми пунктами меню      |                                                                                                                                                                                                                                   |
| hasItem(index)              | Метод, который проверяет наличие элемента по индексу, возвращает true/false     |                                                                                                                                                                                                                                   |
| getItem(index)              | Метод, который возращает элемент меню по индексу                                              |                                                                                                                                                                                                                                   |
| addItem(item)               | Метод, который добавляет в конец новый пункт меню                                             | Использовать в событии onMounted                                                                                                                                                                              |
| removeItem(index)           | Метод, который удаляет пункт меню по индексу                                                      | Использовать в событии onUnmounted                                                                                                                                                                            |
| updateItem(index, item)     | Метод, который частично обновляет пункт меню по индексу                                 | Вторым параметром можно передать объект с некоторыми свойствами для обовления, не переданные свойства не будут обновлены |
| getItemIndex(item)          | Метод, который возвращает индекс элемента меню (-1, если элемент не найден) | Поиск индекса реализован с учетом реактивности vue, не использовать метод indexOf у массива, а испольовать этот метод                  |

#### Пример

```js
import { onMounted, onUnmounted } from 'vue';
import { useMenu } from '@/plugins/menu';

const {
	menu,
	hasItem,
	getItem,
	addItem,
	updateItem,
	removeItem,
} = useMenu();

console.log(menu.value); // Вывести все элементы меню

// Добавить пункт меню
onMounted(() => {
	addItem({
		title: 'Пункт меню',
		path: '/'
	});
});

// Удалить пункт меню
onUnmounted(() => {
	removeItem(3);
});

// Обновить пункт меню
onMounted(() => {
	updateItem(0, {
		title: 'Измененный пункт меню',
	});
});

console.log(hasItem(1)); // Проверить наличие элемента по индексу 1

console.log(getItem(0)); // Получить первый элемент меню

console.log(getItem(menu.value.length - 1)); // Получить последний элемент меню
```

### useCounter

#### Использование

```js
ipmort { useCounter } from '@/plugins/menu';

const { getCounter, setCounter, clearCounter, increment, decrement } = useCounter();
```

#### Описание

| Метод/свойство | Описание                                                                                                |
| --------------------------- | --------------------------------------------------------------------------------------------------------------- |
| getCounter(index)           | Получить счетчик по индексу пункта меню                                       |
| setCounter(index, count)    | Установить счетчик пункту меню по индексу                                   |
| increment(index)            | Прибавить 1 к счетчику пункта меню по индексу                              |
| decrement(index)            | Отнять 1 у счетчика пункта меню по индексу                                    |
| clearCounter(index)         | Очистить счетчик (установить в 0) у пункта меню по его индексу |

#### Пример

```js
import { useCounter } from '@/plugins/menu';

const {
	getCounter,
	setCounter,
	clearCounter,
	increment,
	decrement,
} = useCounter();


setCounter(1, 3); // Установить второму элементу меню счетчик в значение 3

increment(1); // Прибавить 1 к счетчику второго элемента меню

decrement(1); // Отнять 1 у счетчика второго элемента меню

console.log(getCounter(1)); // Получить счетчик у второго элемента меню (его индекс = 1)

clearCounter(1); // Очистить счетчик (установить его в 0) второму элементу меню
```

### useActionButtons

Кнопки, установленные через пункты меню недоступныв этом хуке. Такие кнопки можно изменить через хук useMenu.

#### Использование

```js
import { useActionButtons } from '@/plugins/menu';

const { buttons, getButton, addButton, updateButton, removeButton, clearButtons } = useActionButtons();
```

#### Описание

| Метод/свойство | Описание                                                                                                                 | Примечания                                                                                                                                                                                             |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| buttons                     | Свойство, которое возвращает реактивный массив со всеми доп. кнопками | Кнопки, установленные через пункты меню здесь не будут отображатся                                                                                      |
| getButton(index)            | Метод, который возвращает объект кнопки по индексу                                    |                                                                                                                                                                                                                  |
| addButton(button)           | Метод, который добавляет кнопку в конец                                                         | Использовать в событии onMounted                                                                                                                                                             |
| updateButton(index, button) | Метод, который частично обновляет кнопку по индексу                                  |                                                                                                                                                                                                                  |
| removeButton(index)         | Метод, который удаляет кноку по индексу                                                         | Использовать в событии onUnmounted                                                                                                                                                           |
| clearButtons()              | Метод, который удаляет все дополнительные кнопки                                       | Использовать в событии onUnmounted                                                                                                                                                           |
| getButtonIndex(button)      | Метод, который возвращает индекс кнопки (-1, если элемент не найден)       | Поиск индекса реализован с учетом реактивности vue, не использовать метод indexOf у массива, а испольовать этот метод |

#### Пример

```js
import { useActionButtons } from '@/plugins/menu';
import { onMounted, onUnmounted } from 'vue';

const { buttons, getButton, addButton, updateButton, removeButton, clearButtons } = useActionButtons();

console.log(buttons.value); // Получить массив всех доп. кнопок

console.log(getButton(0)); // Получить объект первой кнопки

updateButton(0, { title: 'Вперед' }); // Обновить название первой кнопки

removeButton(0); // Удалить первую доп. кнопку

// Добавить на страницу кнопку Назад
onMounted(() => {
	addButton({
		title: 'Назад',
		goBack: true,
		icon: 'Back'
	});
});

// При размонтировании компонента очистить все доп. кнопки
onUnmounted(() => {
	clearButtons();
});
```

### useBackButton

#### Использование

```js
import { useBackButton } from '@/plugins/menu';

useBackButton();
```

#### Описание

Функция useBackButton принимает один параметр - объект кнопки. При монитировани компонента (onMounted), в котором была вызвана функция useBackButton добавляет кнопку, а при размонтировании (onUnmounted) удаляет эту кнопку.

Поведение по умолчанию при клике - переход на предыдущую страницу из истории, а если в истории нет предыдущей страницы, то переход будет на заданный маршрут через параметр fallbackPath.

```js
import { useBackButton } from '@/plugins/menu';

useBackButton({ fallbackPath: '/module-home-page' });
```

### Описание типов

Описание всех используемых типов (меню, кнопки, функции) смотреть в types.d.ts в корне плагина.
