<template>
	<el-table-column v-slot="{ row, column }">
		<template v-if="row.editable">
			<el-form-item
				:rules="rules"
				:prop="column.property"
			>
				<slot
					name="editable"
					:column="column"
					:row="row"
				>
					<el-input v-model="row[column.property]" />
				</slot>
			</el-form-item>
		</template>
		<template v-else>
			<slot
				:column="column"
				:row="row"
			>
				{{ row[column.property] }}
			</slot>
		</template>
	</el-table-column>
</template>
<script setup>
defineProps({
	rules: Object,
});
</script>