<template>
	<Preloader :loading="loading">
		<el-result
			icon="warning"
			title="Процесс еще не был создан!"
			sub-title="Пожалуйста, дождитесь когда процесс будет создан"
		>
			<template
				#extra
				v-if="access.full"
			>
				<el-button
					type="primary"
					@click="createProcess"
				>
					Принудительно создать процесс
				</el-button>
			</template>
		</el-result>
	</Preloader>
</template>
<script setup>
import { inject, ref } from 'vue';
import { notify } from '@/plugins/process/utils';
import Preloader from '@/plugins/process/components/common/Preloader.vue';

const { ProcessRepo } = inject('useRepo');
const setActiveProcess = inject('setActiveProcess');
const userId = inject('userId');
const documentId = inject('documentId');
const templateId = inject('templateId');
const executorId = inject('executorId');
const access = inject('access');
const emit = inject('emit');

const loading = ref(false);

const createProcess = async () => {
	try {
		loading.value = true;

		const activeProcess = await ProcessRepo.create({
			user_id: userId.value,
			document_id: documentId.value,
			template_id: templateId.value,
			document_user_id: executorId.value,
		});

		setActiveProcess(activeProcess);
		emit('created');
	} catch (e) {
		notify.fetchError(e.message);
		throw e;
	} finally {
		loading.value = false;
	}
};
</script>