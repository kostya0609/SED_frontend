<template>
	<div class="add-group">
		<el-select
			v-model="type"
			placeholder="Выбрать тип"
			clearable
			value-key="id"
		>
			<el-option
				v-for="item in groupTypes"
				:key="item.id"
				:label="item.title"
				:value="item"
			/>
		</el-select>

		<el-button
			type="primary"
			@click="addGroup"
		>
			Добавить группу
		</el-button>
	</div>

</template>

<script setup>

import { inject, ref } from 'vue';

const groupTypes = inject('groupTypes');

const groups = defineModel('groups');

const type = ref();

const ANY_PARTICIPANT_TYPE = 1;

const addGroup = () => {
	const group = {
		id: null,
		preset_participants: [],
		type_id: type.value.id,
		filled_participants: [],
		max_participants: null,
		type_fill_id: ANY_PARTICIPANT_TYPE,
		type: {
			id: type.value.id,
			title: type.value.title,
		},
		sort: groups.value.length ? groups.value[groups.value.length - 1].sort + 1 : 1,
	};

	groups.value.push(group);
}

</script>
<style scoped>
.add-group {
	display: flex;
	gap: .75rem;
}
</style>