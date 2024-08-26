# Плагин грида

## Установка

Установить модуль грида в папку с плагинами, например

```bash
git submodule add https://gitlab.bitrix.bsi.local/common/plugin_vdg3.git ./src/plugins/vdg3
```

Если необходимо, то добавить зависимость "@element-plus/icons": "^0.0.11" в файл package.json

## Обновление

```bash
cd ./src/plugins/vdg3
```

```bash
git checkout main
```

```bash
git pull
```

## Настройки плагина

| Название | Тип       | Описание                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ---------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| API              | объект | Настройки для измения путей запросов (домена). Если не указать то по умолчанию  API.PROD_URL =` window.location.origin + '/api'`  и  API.DEV_URL = `http://localhost`,                                                                                                                                                                                                                           |
| initData         | массив | Импортируется из внешнего файла (например из src/config/gridInitData.js). Содержит основные настройки ВСЕХ гридов проекта(имя, url - путь для запроса содержимого таблицы,  header - объект с описанием колонок таблицы, context - массив содержит события контекстного меню) ) |
| userId           | число   | Возможно передать ID пользователя, если не задать то будет взят по умолчанию window._userId                                                                                                                                                                                                                                                                                                                |
| module           | строка | Название модуля в котором будут использованы гриды приложения (под этим именем сохраняются данные на бэке)                                                                                                                                                                                                                                                                      |

### Пример настройки плагина

Например в файле main.js регистрируем плагин грида

```js
import { VDG3 } from '@/plugins/vdg3';
import {gridInitData} from '@/config/gridInitData.js'

app.use(VDG3, {
	API: { 
		DEV_URL: "http://localhost:8000",
		PROD_URL: "https://bitrix.bsi.local/api",
	},
	initData: gridInitData,
	userId: window._userId ?? 14317,
	module: 'moduleName'
});
```

## Пример содержимого файла gridInitData.js

В `header` описываются поля таблицы - название, ширина, видимость по умолчанию, порядок сортировки, возможность сотрировки таблицы по содержимому поля.

В `context` описываются пункты меню контекста грида - название пункта и возвращаемая функция должна вернуть объект `{ action: 'detail', instance: row.row } `  action - название действия и instance - содержит экземпляр строки, к которой применен пункт контекстаного меню.

В `pagination` можно настроить видимость пагинации ключ `show :'full',//full//top//bottom//none`     /обе/сверху/снизу/скрыта

В `filter `ключ `show: true,//false`    будет ли виден  фильтр у грида,  ключ  `showProfiles: true//false`,  будет ли у фильтра возможность работы с профилями пользователей

```js
export const gridInitData = [
    {
        name: 'documentsList',
        url: '/sed/documents/v1/documents/list',
        header: {
            id: {
                name: 'ID',
                width: 100,
                show: true,
                sort: 100,
                contentSort: 'desc'
            },
            number: {
                name: 'Номер',
                width: 100,
                show: true,
                sort: 200,
                contentSort: 'desc'
            },
            type: {
                name: 'Тип документа',
                width: 200,
                show: true,
                sort: 300,
                contentSort: 'asc'
            },
        },
        context: [
            {
                text: 'Перейти в документ',
                function: (e, row) => {
                    return { action: 'detail', instance: row };
                }
            },
            {
                text: 'Редактировать документ',
                function: (e, row) => {
                    return { action: 'edit', instance: row };
                }

            },
            {
                text: 'Удалить документ',
                function: (e, row) => {
                    return { action: 'delete', instance: row };
                }
            },
        ],
	pagination: {
            show: 'full'
        },
        filter: {
            show: true,
            showProfiles: true,
        }
    },

    {
        name: 'needActionList',
        url: '/sed/documents/v1/documents/need-action-list',
        header: {
            id: {
                name: 'ID',
                width: 100,
                show: true,
                sort: 100,
                contentSort: 'desc'
            },
            number: {
                name: 'Номер',
                width: 100,
                show: true,
                sort: 200,
                contentSort: 'desc'
            },
            type: {
                name: 'Тип документа',
                width: 200,
                show: true,
                sort: 300,
                contentSort: 'asc'
            },
        },
        context: [
            {
                text: 'Перейти в документ',
                function: (e, row) => {
                    return { action: 'detail', instance: row };
                }
            },
            {
                text: 'Редактировать документ',
                function: (e, row) => {
                    return { action: 'edit', instance: row };
                }

            },
        ],
        pagination: {
            show: 'full'
        },
        filter: {
            show: true,
            showProfiles: true,
        }
    }
];
```

## Использование грида на странице компонета

Необходимо импортировать компонент `Grid` и хук `useGrids`.

Используя хук получить `const { updateGrid, resetGrid, instanceGrids  } = useGrids();` Функция `updateGrid` заполняет таблицу данными, функция `resetGrid` очищает содержимое таблицы грида, `instanceGrids  ` - содержит экземпляры гридов, по имени можно поучить доступ к нужному свойствам нужного грида `instanceGrids[gridName]`

Не забыть про имя грида `const gridName = 'documentsList'; ` ВАЖНО - имя грида такое же как указано в файле с настройками гридов  `gridInitData.js`

```js
<template>
  <Preloader :loading="loading">

    <Grid
      :name="gridName"
      @gridReady="updateGrid(gridName)"
      @eventContext="eventContext"
    />

  </Preloader>
</template>

<script setup>

import { onUnmounted } from 'vue';
import { Preloader } from "@/shared/ui";
import { useRouter } from 'vue-router';
import { ElMessageBox } from 'element-plus';

import { Grid, useGrids } from '@/plugins/vdg3';

const router = useRouter();

const { updateGrid, resetGrid, instanceGrids } = useGrids();

const = 'documentsList';
const loading = computed(() => { return instanceGrids[gridName].loading });

// ниже описание логики действия при нажатии на пункт контекстного меню
const eventContext = (fn, event, row) => {
  const { action, instance } = fn(event, row);

  if (action === 'detail') {
      console.log(instance, 'содержимое строки')

      router.push({ name: 'detailPage', params: { id: instance.document_id[0].value } })
  }

  if (action === 'edit') {
    console.log(instance, 'содержимое строки')

    ElMessageBox.confirm(`Вы уверены, что хотите редактировать документ с ID - ${instance.document_id[0].value}?`)
      .then(() => {
        router.push({ name: 'editPage', params: { id: instance.document_id[0].value } })
      })
      .catch(() => {
      })
  }

  if (action === 'delete') {

    ElMessageBox.confirm(`Вы уверены, что хотите удалить документ с ID - ${instance.document_id[0].value}?`)
      .then(() => {

        console.log('Сделать обработку удаления документа');

      })
      .catch(() => {
      })
  }

}

//ниже вызов функции если необходимо принудительно очистить таблицу грида от содержимого после ухода со страницы
onUnmounted(()=>{
  resetGrid(gridName);
})


</script>
```

## Создание фильтра для грида

На странице с компонентом грида в шаблоне можно например сделать кнопу видимую только админам и нажать один раз чтоб создался фильтр по умолчанию

```js
<el-button 
	v-if="user.roles === 'admin'"
	@click="sendDefaultFilterData"
>
	Загрузить дефолтовый фильтр
</el-button>
```

На странице с компонентом грид в скрпите описать функцию создания фильтра.

Ниже пример с описанием всех возможных типов полей фильтра - число, дата, выпадающий список(заполнен заранее), выпадающий список с возможностью заполнения по поиску в строке(вызывает функцию поиска на бэк) и есть примеры с событием фокуса `focus`  вызывается функция на бэке для заполнения содержимого селекта

```js
    //ниже чтоб на бэк залить дефолтовый фильтр... надо выше раскоментить нужную кнопку
    async function sendDefaultFilterData() {
      //создаст моковый дефолтный фильтр. запустить один раз при разработке, чтоб он записался на бэк
      let defaultFilterData = {
        id                  : {
          show: true,
          type: 'number',
          name: 'Номер',
          min: '',
          max: '',
          operation: '=',
        },
        status              : {
          show: true,
          type: 'list',
          name: 'Статус',
          multiple: true,
          value: [],
          option: [
            {value: 'created', label: 'На оформлении'},
            {value: 'approving', label: 'На согласовании'},
            {value: 'fixing_problem', label: 'На устранении замечаний'},
          ],
        },
        responsible_id     : {
          show: true,
          type: 'searchList',
          name: 'Ответственный',
          multiple: true,
          value: [],
          option: [],
          query: async function (data) {
            let result = await grid.loadJson('/business-trip/search/user', {
              q: data,
            });
            if (result.status == 'success') return result.data
          },
        },
        date_start: {
          show: true,
          type: 'date',
          name: 'Дата выезда',
          min: '',
          max: '',
          operation: '=',
        },
	type_id: {
          show: true,
          type: 'list',
          name: 'Тип SMART-карты',
          multiple: true,
          value: [],
          option: [],
          focus : async function (){
            let result = await grid.loadJson('/smart-card/type/get', {});
            if (result.status === 'success' && result.data) return result.data;
          },
        },
	year: {
          show: true,
          type: 'list',
          name: 'Год SMART-карты',
          multiple: true,
          value: [],
          option: [],
          focus : async function (){
            let current = (new Date()).getFullYear();
            let years = [];
            for(let i = current - 3; i <= current + 1; i++ ){
              years.push( {value : i, label : i})
            };
            return years;
          },
        },
  
      };
      await fetch('http://localhost/grid/filter/preset/default/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            grid_name: gridName,
            module: 'SED',
            data: { ...defaultFilterData },
        })
      });
      notify('Загрузка дефолтового фильтра', result.message, result.status)
    }

```
