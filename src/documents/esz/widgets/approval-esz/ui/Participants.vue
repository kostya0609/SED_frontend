<template>
	<el-collapse
		v-if="checkDocumentStatus([DOCUMENT_STATUS.PREPARATION, DOCUMENT_STATUS.FIX, DOCUMENT_STATUS.COORDINATION, DOCUMENT_STATUS.SIGNING, DOCUMENT_STATUS.FIX_SIGNING])"
		v-model="activeTabs"
		class="participants"
	>
		<el-collapse-item
			name="signatory"
			v-if="checkDocumentStatus([DOCUMENT_STATUS.PREPARATION, DOCUMENT_STATUS.FIX, DOCUMENT_STATUS.COORDINATION])"
		>
			<template #title>
				<span class="participants__title">Подписание</span>
			</template>
			<ParticipantsTable :users="[document.signatory]" />
		</el-collapse-item>
		<el-collapse-item
			name="recevier"
			v-if="checkDocumentStatus([DOCUMENT_STATUS.PREPARATION, DOCUMENT_STATUS.FIX, DOCUMENT_STATUS.COORDINATION, DOCUMENT_STATUS.SIGNING, DOCUMENT_STATUS.FIX_SIGNING])"
		>
			<template #title>
				<span class="participants__title">Наложение резолюции</span>
			</template>
			<ParticipantsTable :users="document.receivers" />
		</el-collapse-item>
	</el-collapse>
</template>
<script setup>
import ParticipantsTable from './ParticipantsTable.vue';
import { useDocument } from '@/documents/esz/entities/esz';
import { DOCUMENT_STATUS } from "@documents/esz/entities/esz/constants";
import { ref } from 'vue';

const { document, checkDocumentStatus } = useDocument();

const activeTabs = ref(['signatory', 'recevier']);
</script>
<style scoped lang="scss">
.participants {
	&__title {
		margin-left: 1rem;
	}
}

:global(.participants .el-collapse-item__header) {
	--el-collapse-header-bg-color: #FAFAFA;
}
</style>