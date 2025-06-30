<template>
	<el-tree
		class="documents-hierarchy"
		:data="hierarchyTree ? [hierarchyTree] : []"
		default-expand-all
		:expand-on-click-node="false"
		empty-text="Отсутствуют дочерние элементы"
	>
		<template #default="{ data: document }">
			<el-link
				:underline="false"
				:href="document.link"
				target="_blank"
				type="primary"
				:style="{ fontWeight: document.id == document_id ? 'bold' : 'normal' }"
			>
				<template v-if="document.module_name.includes('SED')">
					{{ `${document.title} (${document.status_title}) - ${document.data.theme}` }}
				</template>
				<template v-else>
					<slot :document="document">
						{{ `${document.title} (${document.document_id}) - ${document.status_title}` }}
					</slot>
				</template>
			</el-link>
		</template>
	</el-tree>
</template>

<script setup>
defineProps({
	hierarchyTree: { type: Object, required: true },
	document_id: { type: Number, required: true },
});
</script>