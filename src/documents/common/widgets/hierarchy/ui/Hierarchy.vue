<template>
	<el-tree
		class="hierarchy"
		:data="hierarchyTree"
		:props="{ label: 'number', children: 'children' }"
		default-expand-all
		:expand-on-click-node="false"
		empty-text="Отсутствуют дочерние элементы"
	>
		<template #default="{ data }">
			<el-link
				:class="['hierarchy__element', { 'hierarchy__element_bold': data.document_id == document_id }]"
				:underline="false"
				:href="createDocumentLink(data.type_id, 'detail', data.concrete_document_id)"
				@click="handleClick(data)"
				target="_blank"
				type="primary"
			>
				{{ `${data.number} (${data.status_title}) - ${data.theme_title}` }}
			</el-link>
		</template>
	</el-tree>
</template>

<script setup>
import { createDocumentLink } from '@documents/common/entities/document/';
import { setDocumentId } from '@documents/common/features/selected-document-ids';

defineProps({
	hierarchyTree: { type: Array, default: [] },
	document_id: { type: Number, required: true },
});

const handleClick = (data) => {
	setDocumentId(data.document_id);
};
</script>
<style lang="scss" scoped>
.hierarchy {
	&__element {
		&_bold {
			font-weight: bold;
		}
	}
}
</style>