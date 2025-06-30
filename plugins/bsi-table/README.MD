# Плагин таблицы

## Установка

**В папку src/plugins:**

```bash
git submodule add https://gitlab.bitrix.bsi.local/common/plugin_bsi_table.git ./src/plugins/bsi-table
```

**В папку plugins:**

```bash
git submodule add https://gitlab.bitrix.bsi.local/common/plugin_bsi_table.git ./plugins/bsi-table
```

## Обновление

```bash
cd ./plugins/menu
```

```bash
git checkout main
```

```bash
git pull
```

## Использование

Обязательно указать идентификатор таблицы (id), т.к. по нему будет сохранятся состояние таблицы в хранилище. Для каждой таблицы в модуле должен быть свой идентификатор. Если будут пересечения идентификаторов, то состояния для таблиц с одинаковым id будут пересекатся, что недопустима в большинстве случаев!

### Подключение плагина

```js
import { BsiTablePlugin } from '@/plugins/bsi-table';

app.use(BsiTablePlugin, {
	module: 'ModuleName',
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

```vue
<template>
	<BsiTable
		filterable
		searchable
		border
		:filter="filter"
		:change="handleChangeSettings"
		storage="local"
		id="templates-table"
		class="templates-table"
		v-model:data="data"
	>
		<BsiTableColumn
			prop="_actions"
			align="center"
			width="120"
			v-slot="{ row }"
		>
			<el-button-group>
				<el-button
					icon="Edit"
					type="primary"
					size="small"
					@click="$router.push({ name: 'detailProcess', params: { id: row.id } });"
				/>
				<el-button
					icon="Delete"
					type="danger"
					size="small"
					@click="handleDeleteTemplate(row.id)"
				/>
			</el-button-group>
		</BsiTableColumn>
		<BsiTableColumn
			prop="id"
			label="ID"
			align="center"
			width="80"
			sortable="custom"
		/>
		<BsiTableColumn
			prop="title"
			label="Название шаблона"
			width="350"
			sortable
		/>
		<BsiTableColumn
			prop="user"
			label="Создатель"
			width="320"
			sortable="custom"
			v-slot="{ row }"
		>
			<UserLink
				:user="row.user"
				v-if="row.user"
			/>
		</BsiTableColumn>
		<BsiTableColumn
			prop="module_name"
			label="Модуль"
			width="150"
			sortable
		/>
		<BsiTableColumn
			prop="parent_module_name"
			label="Родительский модуль"
			width="150"
			sortable
		/>
		<BsiTableColumn
			prop="sender_user"
			label="Отправитель"
			width="320"
			sortable="custom"
			v-slot="{ row }"
		>
			{{ row.sender_user && row.sender_user.full_name }}
		</BsiTableColumn>
		<BsiTableColumn
			prop="created_at"
			label="Дата создания"
			v-slot="{ row }"
			width="200"
			sortable
		>
			{{ formatDate(row.created_at) }}
		</BsiTableColumn>
		<BsiTableColumn
			prop="updated_at"
			label="Дата изменения"
			v-slot="{ row }"
			width="200"
			sortable
		>
			{{ formatDate(row.updated_at) }}
		</BsiTableColumn>
	</BsiTable>
</template>
<script setup>
import { inject, ref } from 'vue';
import { ProcessRepo } from "@/repositories";
import { BsiTable, BsiTableColumn } from '@/plugins/bsi-table';
import UserLink from '@/components/link_user.vue';
import { ElMessageBox } from 'element-plus';

const user = inject('user');

const data = ref([]);

const filter = ref([
	{
		column: 'id',
		type: 'number',
		title: 'ID',
		value: null,
		operator: null,
	},
	{
		column: 'title',
		type: 'string',
		title: 'Название шаблона',
		value: null,
		operator: null,
	},
	{
		column: 'module_name',
		type: 'string',
		title: 'Модуль',
		value: null,
		operator: null,
	},
	{
		column: 'parent_module_name',
		type: 'string',
		title: 'Родительский модуль',
		value: null,
		operator: null,
	},
	{
		column: 'created_at',
		type: 'date',
		title: 'Дата создания',
		value: null,
		operator: null,
	},
	{
		column: 'updated_at',
		type: 'date',
		title: 'Дата обновления',
		value: null,
		operator: null,
	},
]);

const formatDate = (date, options = {
	year: 'numeric',
	month: 'long',
	day: 'numeric',
	hour: 'numeric',
	minute: 'numeric',
	second: 'numeric',
}) => new Date(date).toLocaleString('ru', options);

const handleDeleteTemplate = async (id) => {
	ElMessageBox.confirm(`Вы уверены, что хотите удалить шаблон с ID - ${id}?`)
		.then(async () => {
			await ProcessRepo.delete({ id: id, user_id: user.id });
			data.value = data.value.filter(item => item.id !== id);
		})
		.catch(() => { });
};

const handleChangeSettings = async ({ paginate, filter, sort, search }) => {

	const result = await ProcessRepo.getAll({
		paginate,
		sort,
		filter,
		search,
		user_id: user.id,
	});

	return result;
};
</script>

<style scoped>
.templates-table {
	margin: 1rem 0;
}
</style>
```
