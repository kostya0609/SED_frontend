<template>
	<el-form-item
		prop="extra_fields.employee_id"
		:rules="rules.employee_id"
	>
		<el-select
			filterable
			placeholder="Введите ФИО"
			clearable
			no-data-text="Нет активных участников на данном этапе"
			v-model="data.extra_fields.employee_id"
		>
			<el-option-group
				v-for="group in groups"
				:key="group.id"
				:label="group.type.title"
			>
				<el-option
					v-for="participant in group.participants"
					:key="participant.id"
					:label="participant.user.full_name"
					:value="participant.id"
					:disabled="participant.action && participant.action.template_action.is_process_affect"
				/>
			</el-option-group>
		</el-select>
	</el-form-item>
	<BaseAction
		:action="action"
		:show-files="false"
	/>
</template>
<script setup>
import { notify } from '@/plugins/process/utils';
import { ACTIVE_PROCESS_TYPE } from '@/plugins/process/constants';
import { inject, reactive, ref, onMounted, onUnmounted } from 'vue';
import BaseAction from '@/plugins/process/components/process/action/BaseAction.vue';

const data = inject('data');
const { ProcessRepo } = inject('useRepo');
const activeProcess = inject('activeProcess');
const actionEmitter = inject('actionEmitter');

defineProps({
	action: Object,
});

data.extra_fields = {
	employee_id: null,
};

const rules = reactive({
	employee_id: {
		required: true,
		message: 'Выберите пользователя',
	}
});

const groups = ref([]);

const updateGroups = async () => {
	if (activeProcess.value.type !== ACTIVE_PROCESS_TYPE.CREATED) {
		return;
	}

	try {
		groups.value = await ProcessRepo.getParticipantsFromActiveStage({
			process_id: activeProcess.value.process.id,
		});
	} catch (e) {
		notify.fetchError(e.message);
		throw e;
	}
};

onMounted(async () => {
	await updateGroups();
	actionEmitter.on('decide', updateGroups);
});

onUnmounted(async () => {
	actionEmitter.removeListener('decide', updateGroups);
});
</script>