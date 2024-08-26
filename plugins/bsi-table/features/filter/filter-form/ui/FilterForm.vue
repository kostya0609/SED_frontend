<template>
	<el-form
		label-position="top"
		:model="model"
		ref="formRef"
	>
		<el-form-item
			v-for="field of items"
			:key="field.column"
			:label="field.title"
			:prop="`${field.column}.value`"
			:rules="field.rules"
		>
			<div class="filter-item">
				<OperatorField
					:type="field.type"
					v-model="model[field.column].operator"
					v-model:value="model[field.column].value"
					class="filter-item__operator"
				/>
				<ValueField
					v-if="field.type"
					:type="field.type"
					v-model="model[field.column].value"
					class="filter-item__value"
					:operator="model[field.column].operator"
				/>
				<div class="filter-item__delete">
					<el-button
						icon="Close"
						@click="deleteField(field.column)"
					/>
				</div>
			</div>
		</el-form-item>
		<el-form-item>
			<div class="filter-item__actions">
				<el-button
					type="default"
					@click="reset"
				>
					Очистить
				</el-button>
				<el-button
					type="primary"
					@click="submit"
				>
					Найти
				</el-button>
			</div>
		</el-form-item>
	</el-form>
</template>
<script setup>
import { ref, watch } from 'vue';
import { OperatorField } from './operator-field';
import { ValueField } from './value-field';

const props = defineProps({
	filter: {
		type: Array,
		required: true,
	},
	state: {
		type: Object,
		required: false,
		default: null,
	},
});

const emit = defineEmits(['filter', 'reset']);

const formRef = ref();
const items = ref(props.filter);

const entries = items.value.map(
	({ column, value, operator }) =>
		[column, { value, operator }]
);


/**
 * @example
 * {
 * 	id: { value: 1, operator: 'equal' },
 *  name: { value: 'Tom', operator: 'equal' },
 * }
 */
const model = ref(Object.fromEntries(entries));

const deleteField = column => {
	items.value = items.value.filter(field => field.column !== column);
};

const reset = () => {
	model.value = Object.fromEntries(
		items.value.map(({ column }) => [column, { value: null, operator: null }])
	);

	emit('reset', model.value);
};

const submit = async () =>
	await formRef.value.validate(isValid => {
		if (!isValid) return;

		emit('filter', model.value);
	});

watch(() => props.state, (state) => {
	model.value = state;
});
</script>
<style lang="scss" scoped>
.filter-item {
	display: flex;
	flex-wrap: wrap;
	gap: .5rem;
	flex: 1;

	&__operator {
		flex: 0 0 160px;
	}

	&__value {
		flex: 1;
	}

	&__actions {
		flex: 1;
		display: flex;
		justify-content: flex-end;
	}
}

::v-deep(.el-form-item__content) {
	line-height: normal;
}
</style>