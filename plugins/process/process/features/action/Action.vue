<template>
	<Preloader :loading="loading">
		<el-card class="action">
			<template #header>
				<div class="action__header">
					<span>Действие</span>
					<span>
						<el-button
							type="primary"
							@click="save"
						>
							Сохранить
						</el-button>
					</span>
				</div>
			</template>
			<el-form
				label-position="top"
				:rules="rules"
				:model="data"
				ref="form"
			>
				<el-form-item prop="directorId">
					<SelectSubuser
						:supervisor-participants="supervisorParticipants"
						v-model="data.directorId"
						v-if="supervisorParticipants"
					/>
				</el-form-item>
				<el-form-item prop="action">
					<el-select
						v-model="actionId"
						class="action__select"
					>
						<el-option
							v-for="action of actions"
							:key="action.id"
							:label="action.title"
							:value="action.id"
							:class="action.template_action.is_process_affect ? 'is_process_affect' : ''"
						/>
					</el-select>
				</el-form-item>
				
				<template v-if="data.action">
					<PositiveAction
						v-if="data.action.template_action_id === TEMPLATE_ACTION.POSITIVE_ACTION"
						:action="data.action"
					/>
					<NegativeAction
						v-else-if="data.action.template_action_id === TEMPLATE_ACTION.NEGATIVE_ACTION"
						:action="data.action"
					/>
					<MakeCommentAndNotifyExecutor
						v-else-if="data.action.template_action_id === TEMPLATE_ACTION.MAKE_COMMENT_AND_NOTIFY_PROCESS_EXECUTOR"
						:action="data.action"
					/>
					<MakeCommentAndNotifyExecutorDocument
						v-else-if="data.action.template_action_id === TEMPLATE_ACTION.MAKE_COMMENT_AND_NOTIFY_DOCUMENT_EXECUTOR"
						:action="data.action"
					/>
					<AttractAction
						v-else-if="data.action.template_action_id === TEMPLATE_ACTION.ATTRACT_ACTION"
						:action="data.action"
					/>
					<SkipAction
						v-else-if="data.action.template_action_id === TEMPLATE_ACTION.SKIP_ACTION"
						:action="data.action"
					/>
					<CustomAction
						v-else-if="data.action.template_action_id === TEMPLATE_ACTION.MAKE_COMMENT_AND_NOTIFY_PARTICIPANTS"
						:action="data.action"
					/>
					<PostCommentAction
						v-else-if="data.action.template_action_id === TEMPLATE_ACTION.POST_COMMENT_ACTION"
						:action="data.action"
					/>
					<RequestChangeDeadline
						v-else-if="data.action.template_action_id === TEMPLATE_ACTION.REQUEST_CHANGE_DEADLINE"
						:action="data.action"
					/>
					<RequestCancellation
						v-else-if="data.action.template_action_id === TEMPLATE_ACTION.REQUEST_CANCELLATION"
						:action="data.action"
					/>
					<RequestExecutorChange
						v-else-if="data.action.template_action_id === TEMPLATE_ACTION.REQUEST_EXECUTOR_CHANGE"
						:action="data.action"
					/>
					<MakeCommentAndNotifyAntotherEmployee
						v-else-if="data.action.template_action_id === TEMPLATE_ACTION.MAKE_COMMENT_AND_NOTIFY_ANOTHER_EMPLOYEE"
						:action="data.action"
					/>
					<el-alert
						type="error"
						:closable="false"
						v-else
					>
						Не реализован компонент для действия с ID {{ data.action.template_action_id }}
					</el-alert>
				</template>
			</el-form>
		</el-card>
	</Preloader>
</template>
<script setup>
import SelectSubuser from './SelectDirectors.vue';
import { useComments } from '@/plugins/process/interaction';
import { provide, reactive, ref, watch, toRaw } from 'vue';
import { notify, EventEmitter, Preloader, TEMPLATE_ACTION, useActiveProcess, useProcessProvider } from '@/plugins/process/common';
import {
	PositiveAction,
	NegativeAction,
	MakeCommentAndNotifyExecutor,
	MakeCommentAndNotifyExecutorDocument,
	AttractAction,
	SkipAction,
	CustomAction,
	PostCommentAction,
	RequestChangeDeadline,
	RequestCancellation,
	RequestExecutorChange,
	MakeCommentAndNotifyAntotherEmployee
} from './actions';

const { initComments } = useComments();
const { activeProcess, decide } = useActiveProcess();
const { documentId, templateId, document, userId } = useProcessProvider();

const props = defineProps({
	actions: {
		required: false,
		type: Array,
	},
	supervisorParticipants: {
		type: Object,
		required: false,
	},
});

const emit = defineEmits(['decide', 'decidedWithInteraction', 'changeDirectorId']);

const data = reactive({
	action: null,
	directorId: null,
});

const actionId = ref();

const rules = ref({
	action: {
		required: true,
		message: 'Выберите действие',
	},
	directorId: {
		required: false,
		message: 'Выберите за кого принять решение',
	},
});

const form = ref();
const loading = ref(false);
const isSaved = ref(false);

const actionEmitter = new EventEmitter();

const getRawData = (data) => {
	const action = { ...toRaw(data.action) };
	const comment = data.comment;
	const extra_fields = data.extra_fields && { ...toRaw(data.extra_fields) };

	return {
		action,
		comment,
		extra_fields,
	};
};

const save = async () => {
	await form.value.validate(async (isValid) => {
		if (!isValid) {
			return;
		}

		try {
			loading.value = true;
			isSaved.value = true;

			const payload = new FormData();
			const action = data.action;

			if (data.files && data.files.length > 0) {
				data.files.forEach(file => {
					payload.append('files[]', file.raw);
				});
			}

			if (data.directorId) {
				payload.append('subuser_id', userId.value);
				payload.append('user_id', data.directorId);
			} else {
				payload.append('user_id', userId.value);
			}

			payload.append('process_id', activeProcess.value.process.id);
			payload.append('action_id', data.action.id);
			payload.append('comment', data.comment || '');
			payload.append('document', JSON.stringify(document.value || null));
			payload.append('extra_fields', JSON.stringify(data.extra_fields || null));

			const _activeProcess = await decide(payload);

			activeProcess.value = _activeProcess;

			emit('decide', _activeProcess, data.action);
			actionEmitter.emit('decide', getRawData(data));

			if (action.interaction && action.interaction.enabled) {
				await initComments(documentId.value, templateId.value, userId.value);
				emit('decidedWithInteraction', _activeProcess, action);
			}

			if (_activeProcess.isCreated() && _activeProcess.process.isRunned()) {
				form.value && form.value.resetFields();
			}
		} catch (e) {
			notify.fetchError(e.message);
			throw e;
		} finally {
			isSaved.value = false;
			loading.value = false;
		}
	});
};

watch(() => data.action, () => {
	const fields = Object.keys(data).filter(name => !['action', 'directorId'].includes(name));
	!!(fields.length && form.value) && form.value.resetFields(fields);
});

watch(() => actionId.value, () => {
	data.action = props.actions.find(action => action.id === actionId.value);
});

watch(() => props.supervisorParticipants, (supervisorParticipants) => {
	rules.value.directorId.required = !!supervisorParticipants ? !supervisorParticipants.is_active && supervisorParticipants.participants.length > 1 : true;
}, { immediate: true });

watch(() => data.directorId, (directorId) => {
	emit('changeDirectorId', directorId || null);
});

provide('data', data);
provide('form', form);
provide('actionEmitter', actionEmitter);
</script>
<style scoped lang="scss">
.action {
	&__header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: .5rem;
	}

	&__select {
		width: 100%;
	}
}

.el-select-dropdown__item.is-hovering.is_process_affect {
	background-color: rgb(230, 255, 230);
}
</style>