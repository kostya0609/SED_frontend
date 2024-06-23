<template>
	<div v-if="isDebug">
		<el-space>
			<el-button
				type="primary"
				icon="View"
				@click="getParticipantHistory"
				v-if="!isShowParticipantHistory"
			>
				Показать историю участников
			</el-button>
			<el-button
				type="danger"
				icon="Hide"
				@click="hideParticipantHistory"
				v-else
			>
				Скрыть историю участников
			</el-button>
		</el-space>
		<UserTable
			class="user-table"
			:users="users"
			v-if="isShowParticipantHistory"
		/>
		<el-descriptions
			:column="1"
			border
			class="process-info"
		>
			<el-descriptions-item label="ID шаблона процесса">
				<Copy>{{ templateId }}</Copy>
			</el-descriptions-item>
			<el-descriptions-item label="ID процесса">
				<Copy v-if="activeProcess.process">{{ activeProcess.process.id }}</Copy>
				<template v-else>NULL</template>
			</el-descriptions-item>
			<el-descriptions-item label="Инициатор процесса">
				<UserLink
					v-if="activeProcess.process && activeProcess.process.user"
					:user="activeProcess.process.user"
				/>
				<template v-else>NULL</template>
			</el-descriptions-item>
			<el-descriptions-item label="Инициатор документа">
				<UserLink
					v-if="activeProcess.process && activeProcess.process.document_user"
					:user="activeProcess.process.document_user"
				/>
				<template v-else>NULL</template>
			</el-descriptions-item>
			<el-descriptions-item label="Дата создания процесса">
				<template v-if="activeProcess.process && activeProcess.process.created_at">
					<Copy>{{ formatDateTime(activeProcess.process.created_at) }}</Copy>
				</template>
				<template v-else>NULL</template>
			</el-descriptions-item>
			<el-descriptions-item label="Дата запуска процесса">
				<template v-if="activeProcess.process && activeProcess.process.executed_at">
					<Copy>{{ formatDateTime(activeProcess.process.executed_at) }}</Copy>
				</template>
				<template v-else>NULL</template>
			</el-descriptions-item>
		</el-descriptions>
	</div>
	<CreatedProcess
		:process="activeProcess.process"
		v-if="activeProcess.type === ACTIVE_PROCESS_TYPE.CREATED"
	>
		<template v-slot:head="process">
			<slot
				name="head"
				:process="process.process"
			/>
		</template>
	</CreatedProcess>
	<CompletedProcess
		:active-process="activeProcess"
		v-else-if="activeProcess.type === ACTIVE_PROCESS_TYPE.COMPLETED"
	/>
	<NotCreatedProcess v-else-if="activeProcess.type === ACTIVE_PROCESS_TYPE.NOT_CREATED" />
	<el-alert
		type="warning"
		v-else
	>
		Неверный тип процесса!
	</el-alert>
</template>
<script setup>
import { inject, provide, ref } from 'vue';
import { ACTIVE_PROCESS_TYPE } from '@/plugins/process/constants';
import CreatedProcess from '@/plugins/process/components/process/active-process/CreatedProcess.vue';
import CompletedProcess from '@/plugins/process/components/process/active-process/CompletedProcess.vue';
import NotCreatedProcess from '@/plugins/process/components/process/active-process/NotCreatedProcess.vue';
import UserTable from '@/plugins/process/components/common/UserTable.vue';
import Copy from '@/plugins/process/components/common/Copy.vue';
import UserLink from '@/plugins/process/components/common/UserLink.vue';
import { formatDateTime } from '@/plugins/process/utils';

const activeProcess = inject('activeProcess');
const useRepo = inject('useRepo');
const access = inject('access');
const templateId = inject('templateId');
const documentId = inject('documentId');
const isDebug = inject('isDebug');

const users = ref([]);
const isShowParticipantHistory = ref(false);

const { ParticipantRepo } = useRepo;

if (!activeProcess.value) {
	throw new Error('Активный процесс не был передан!');
}

const emit = defineEmits([
	'runned',
	'executorCancelled',
	'participantCancelled',
	'cancelled',
	'decided',
	'completed',
	'created',
	'deleted',
]);

const getParticipantHistory = async () => {
	users.value = await ParticipantRepo.getParticipantHistory({
		template_id: templateId.value,
		document_id: documentId.value,
	});

	isShowParticipantHistory.value = true;
};

const hideParticipantHistory = () => {
	isShowParticipantHistory.value = false;
};

provide('emit', emit);
</script>
<style lang="scss">
.process-info {
	margin-top: 1rem;
	max-width: 600px;
}

.user-table {
	margin-top: 1rem;
}
</style>