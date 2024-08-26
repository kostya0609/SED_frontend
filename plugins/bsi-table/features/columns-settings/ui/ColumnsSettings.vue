<template>
	<el-table :data="columns">
		<el-table-column
			prop="label"
			label="Колонка"
		/>
		<el-table-column
			prop="_actions"
			label="Активность"
			v-slot="{ row }"
		>
			<el-switch
				size="small"
				v-model="row.is_active"
				@change="handleChangeColumns"
			/>
		</el-table-column>
		<el-table-column
			prop="width"
			label="Ширина"
			v-slot="{ row }"
		>
			<el-input
				v-model="row.width"
				@change="handleChangeColumns"
			/>
		</el-table-column>
		<el-table-column
			prop="order"
			label="Сортировка"
			v-slot="{ row }"
		>
			<el-input-number
				v-model="row.order"
				@change="handleChangeColumns"
			/>
		</el-table-column>
	</el-table>
</template>
<script setup>
const columns = defineModel({ type: Array });

const emit = defineEmits(['change']);

const handleChangeColumns = () => {
	emit('change', columns.value);
};
</script>