<template>
	<el-link
		:href="reportLink"
		:underline="false"
		type="primary"
		class="download-report"
		icon="Download"
	>
		Скачать отчет
	</el-link>
</template>
<script setup>
import { computed } from 'vue';
import { getDownLoadLink } from '@/common/shared/utils';

const props = defineProps({
	reportFileId: { type: Number, required: true },
});

const reportLink = computed(() => getDownLoadLink(props.reportFileId));
</script>
<style scoped lang="scss">
.download-report {
	gap: .25rem;
	flex: 0 1 120px;
	border-radius: 0 var(--el-border-radius-base) var(--el-border-radius-base) 0;
}
</style>