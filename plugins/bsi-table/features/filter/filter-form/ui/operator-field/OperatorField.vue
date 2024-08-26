<template>
	<el-select
		v-model="value"
		clearable
		@change="handleChange"
		@clear="() => { value = null }"
	>
		<el-option
			v-for="operator in fieldOperators"
			:key="operator.id"
			:label="operator.title"
			:value="operator.id"
		/>
	</el-select>
</template>
<script setup>
const props = defineProps({
	type: String,
});

const value = defineModel();
const modelValue = defineModel('value');

const OPERATOR_GROUP = {
	NUMBER_DATETIME: 1,
	STRING: 2,
	COMMON: 3,
};

const operators = [
	{
		id: 1,
		title: 'Равно',
		group_id: OPERATOR_GROUP.NUMBER_DATETIME,
	},
	{
		id: 2,
		title: 'Не равно',
		group_id: OPERATOR_GROUP.NUMBER_DATETIME,
	},
	{
		id: 3,
		title: 'Больше',
		group_id: OPERATOR_GROUP.NUMBER_DATETIME,
	},
	{
		id: 4,
		title: 'Меньше',
		group_id: OPERATOR_GROUP.NUMBER_DATETIME,
	},
	{
		id: 5,
		title: 'Больше или равно',
		group_id: OPERATOR_GROUP.NUMBER_DATETIME,
	},
	{
		id: 6,
		title: 'Меньше или равно',
		group_id: OPERATOR_GROUP.NUMBER_DATETIME,
	},
	{
		id: 7,
		title: 'Входит в диапазон',
		group_id: OPERATOR_GROUP.NUMBER_DATETIME,
	},
	{
		id: 8,
		title: 'Содержит',
		group_id: OPERATOR_GROUP.STRING,
	},
	{
		id: 9,
		title: 'Не содержит',
		group_id: OPERATOR_GROUP.STRING,
	},
	{
		id: 10,
		title: 'Начинается с',
		group_id: OPERATOR_GROUP.STRING,
	},
	{
		id: 11,
		title: 'Заканчивается на',
		group_id: OPERATOR_GROUP.STRING,
	},

	{
		id: 12,
		title: 'Пусто',
		group_id: OPERATOR_GROUP.COMMON,
	},
	{
		id: 13,
		title: 'Не пусто',
		group_id: OPERATOR_GROUP.COMMON,
	},
];

const fieldOperators = operators.filter(({ group_id }) => {
	switch (props.type) {
		case 'string':
			return [OPERATOR_GROUP.STRING, OPERATOR_GROUP.COMMON].includes(group_id);

		case 'date':
			return [OPERATOR_GROUP.NUMBER_DATETIME, OPERATOR_GROUP.COMMON].includes(group_id);

		case 'number':
			return [OPERATOR_GROUP.NUMBER_DATETIME, OPERATOR_GROUP.COMMON].includes(group_id);

		default:
			console.warn(`Нет обработки для типа поля ${props.type}`);
			return [OPERATOR_GROUP.COMMON].includes(group_id);
	}
});

const handleChange = (value) => {
	if (value === 7) {
		modelValue.value = [];
	} else {
		modelValue.value = null;
	}
};
</script>