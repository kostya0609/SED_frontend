<template>
	<el-popconfirm
		title="Формирование отчета займёт некоторое время. Вы действительно хотите запустить процесс?"
		width="400"
		@confirm="handleConfirm"
	>
		<template #reference>
			<el-button
				type="danger"
				:loading="loading"
			>
				Сформировать отчет
			</el-button>
		</template>
	</el-popconfirm>
</template>
<script setup>
import { ReportRepo } from '@report/entities/report';
import { getDownLoadLink, notify } from '@/common/shared/utils';
import { ref } from 'vue';

const loading = ref(false);

const handleConfirm = async () => {
	try {
		loading.value = true;
		const report = await ReportRepo.generateExcelReport();

		const link = document.createElement('a');
		link.setAttribute('href', getDownLoadLink(report.file_id));
		link.setAttribute('download', report.file.original_name);
		link.click();

		notify.successLeft('Отчет успешно сформирован!', 'Скачивание отчета... Отчет появится в таблице после обновления страницы.');
	} catch (e) {
		notify.fetchError(e.message);
		throw e;
	} finally {
		loading.value = false;
	}
};
</script>