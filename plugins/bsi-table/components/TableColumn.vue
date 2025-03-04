<template>
	<el-table-column>
		<template
			v-slot:default="{ row, column }"
			v-if="editable"
		>
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
		<template
			v-slot:default="{ row, column }"
			v-else
		>
			<slot
				:column="column"
				:row="row"
			>
				{{ row[column.property] }}
			</slot>
		</template>
		<template #header="slotAttrs">
			<slot
				name="header"
				v-bind="slotAttrs"
			/>
		</template>
		<template #filter-icon="slotAttrs">
			<slot
				name="filter-icon"
				v-bind="slotAttrs"
			/>
		</template>
	</el-table-column>
</template>
<script setup>
defineProps({
	rules: Object,
	editable: {
		type: Boolean,
		default: false,
	}
});
</script>