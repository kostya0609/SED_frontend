<template>
	<Preloader :loading="loading">
		<template v-if="access.full || access.execute">
			<Stages
				:stages="stages"
				mode="edit"
			/>
			<div class="preparing-process__actions">
				<el-space>
					<el-popconfirm
						title="Вы уверены, что хотите удалить бизнес-процесс?"
						@confirm="remove"
						width="200"
						v-if="access.full"
					>
						<template #reference>
							<el-button type="danger">
								Удалить процесс
							</el-button>
						</template>
					</el-popconfirm>
					<el-popconfirm
						title="Вы уверены, что хотите пересоздать бизнес-процесс?"
						@confirm="rebuild"
						width="200"
						v-if="access.full"
					>
						<template #reference>
							<el-button type="danger">
								Пересоздать процесс
							</el-button>
						</template>
					</el-popconfirm>
					<el-button
						type="primary"
						@click="run"
						v-if="access.full || access.execute"
					>
						Запустить процесс
					</el-button>
				</el-space>
			</div>
		</template>
		<template v-else>
			<el-result
				icon="warning"
				title="Процесс на подготовке!"
				sub-title="Пожалуйста, дождитесь когда процесс будет запущен!"
			/>
		</template>
	</Preloader>
</template>
<script setup>
import { inject, ref } from 'vue';
import { notify } from '@/plugins/process/utils';
import Stages from '@/plugins/process/components/process/stages/Stages.vue';
import Preloader from '@/plugins/process/components/common/Preloader.vue';

const { ProcessRepo } = inject('useRepo');
const processId = inject('processId');
const userId = inject('userId');
const documentId = inject('documentId');
const templateId = inject('templateId');
const executorId = inject('executorId');
const setActiveProcess = inject('setActiveProcess');
const emit = inject('emit');
const access = inject('access');

const stages = ref([]);
const loading = ref(false);

try {
	loading.value = true;
	const result = await ProcessRepo.getActiveStages({
		process_id: processId.value,
	});


	stages.value = result;
} catch (e) {
	notify.fetchError(e.message);
	throw e;
} finally {
	loading.value = false;
}

const run = async () => {
	try {
		loading.value = true;
		const activeProcess = await ProcessRepo.run({ process_id: processId.value, user_id: userId.value });
		setActiveProcess(activeProcess);
		emit('runned');
	} catch (e) {
		notify.fetchError(e.message);
		throw e;
	} finally {
		loading.value = false;
	}
};

const remove = async () => {
	try {
		loading.value = true;
		const activeProcess = await ProcessRepo.delete({ process_id: processId.value });
		setActiveProcess(activeProcess);
		emit('deleted');
	} catch (e) {
		notify.fetchError(e.message);
		throw e;
	} finally {
		loading.value = false;
	}
};

const rebuild = async () => {
	try {
		loading.value = true;
		await ProcessRepo.rebuild({
			user_id: userId.value,
			document_id: documentId.value,
			template_id: templateId.value,
			document_user_id: executorId.value,
		});

		location.reload();
	} catch (e) {
		notify.fetchError(e.message);
		throw e;
	} finally {
		loading.value = false;
	}
};
</script>
<style scoped lang="scss">
.preparing-process {
	&__actions {
		display: flex;
		justify-content: flex-end;
	}
}
</style>