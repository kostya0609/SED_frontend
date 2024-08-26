# Плагин таблицы

## Установка

```bash
git submodule add https://gitlab.bitrix.bsi.local/common/plugin_bsi_table.git ./src/plugins/bsi-table
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

### Подключение плагина

```js
import { BsiTablePlugin } from '@/plugins/bsi-table';

app.use(BsiTablePlugin, {
	moduleName: 'ModuleName',
	userId: window._userId,
});
```

### Простой пример таблицы

```html
<template>
    <BsiTable :data="items" border id="items-table">
        <BsiTableColumn prop="date" label="Дата" />
        <BsiTableColumn prop="type" label="Тип" />
        <BsiTableColumn prop="amount" label="Сумма" />
        <BsiTableColumn prop="description" label="Описание" />
    </BsiTable>
</template>

<script setup>
import { BsiTable, BsiTableColumn } from '@/plugins/bsi-table';

const items = [
    {
        date: '2022-01-01',
        type: 'Пополнение',
        amount: 1000.00,
        description: 'Инициальное пополнение',
    },
    {
        date: '2022-01-05',
        type: 'Снятие',
        amount: 500.00,
        description: 'Оплата аренды',
    },
    {
        date: '2022-01-10',
        type: 'Пополнение',
        amount: 2000.00,
        description: 'Дополнительное пополнение',
    },
];
</script>
```

### Сложный пример

```js
// В разработке...
```
