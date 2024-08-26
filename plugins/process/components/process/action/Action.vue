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
						v-if="data.action.template_action_id === TEMPLATE_ACTION.POSITIVE_TYPE"
						:action="data.action"
					/>
					<NegativeAction
						v-else-if="data.action.template_action_id === TEMPLATE_ACTION.NEGATIVE_TYPE"
						:action="data.action"
					/>
					<MakeCommentAndNotifyExecutor
						v-else-if="data.action.template_action_id === TEMPLATE_ACTION.MAKE_COMMENT_AND_NOTIFY_EXECUTOR"
						:action="data.action"
					/>
					<MakeCommentAndNotifyExecutorDocument
						v-else-if="data.action.template_action_id === TEMPLATE_ACTION.MAKE_COMMENT_AND_NOTIFY_EXECUTOR_DOCUMENT"
						:action="data.action"
					/>
					<AttractAction
						v-else-if="data.action.template_action_id === TEMPLATE_ACTION.ATTRACT"
						:action="data.action"
					/>
					<SkipAction
						v-else-if="data.action.template_action_id === TEMPLATE_ACTION.SKIP"
						:action="data.action"
					/>
					<CustomAction
						v-else-if="data.action.template_action_id === TEMPLATE_ACTION.CUSTOM"
						:action="data.action"
					/>
					<PostCommentAction
						v-else-if="data.action.template_action_id === TEMPLATE_ACTION.POST_COMMENT"
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
import { notify, EventEmitter } from '@/plugins/process/utils';
import { TEMPLATE_ACTION } from '@/plugins/process/constants';
import { inject, provide, reactive, ref, watch, toRaw } from 'vue';
import Preloader from '@/plugins/process/components/common/Preloader.vue';
import PositiveAction from '@/plugins/process/components/process/action/PositiveAction.vue';
import NegativeAction from '@/plugins/process/components/process/action/NegativeAction.vue';
import MakeCommentAndNotifyExecutor from '@/plugins/process/components/process/action/MakeCommentAndNotifyExecutor.vue';
import MakeCommentAndNotifyExecutorDocument from '@/plugins/process/components/process/action/MakeCommentAndNotifyExecutorDocument.vue';
import AttractAction from '@/plugins/process/components/process/action/AttractAction.vue';
import SkipAction from '@/plugins/process/components/process/action/SkipAction.vue';
import CustomAction from '@/plugins/process/components/process/action/CustomAction.vue';
import PostCommentAction from '@/plugins/process/components/process/action/PostCommentAction.vue';

const { ParticipantRepo } = inject('useRepo');
const processId = inject('processId');
const setActiveProcess = inject('setActiveProcess');
const userId = inject('userId');
const document = inject('document');

const props = defineProps({
	participant: Object,
	actions: Array,
});

const emit = defineEmits(['decide']);

const data = reactive({
	action: null,
});

const actionId = ref();

const rules = ref({
	action: {
		required: true,
		message: 'Выберите действие',
	}
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

			if (data.files && data.files.length > 0) {
				data.files.forEach(file => {
					payload.append('files[]', file.raw);
				});
			}

			payload.append('process_id', processId.value);
			payload.append('user_id', userId.value);
			payload.append('action_id', data.action.id);
			payload.append('comment', data.comment || '');
			payload.append('document', JSON.stringify(document.value || null));
			payload.append('extra_fields', JSON.stringify(data.extra_fields || null));

			const process = await ParticipantRepo.decide(payload);

			setActiveProcess(process);

			emit('decide', process, data.action);
			actionEmitter.emit('decide', getRawData(data));

			form.value.resetFields();
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
	const fields = Object.keys(data).filter(name => name !== 'action');
	!!(fields.length && form.value) && form.value.resetFields(fields);
});

watch(() => props.actions, (actions) => {
	if (actions.length > 0) {
		data.action = actions[0];
		actionId.value = actions[0].id;
	} else {
		data.action = null;
		actionId.value = null;
	}
}, { immediate: true });

watch(() => actionId.value, () => {
	data.action = props.actions.find(action => action.id === actionId.value);
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