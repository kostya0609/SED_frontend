<template>
	<div class="select-document-template">
		<el-input
			v-model="themeTitle"
			:disabled="forceDisabled ? true : disabled"
			placeholder="Введите название темы или нажмите выбрать"
		>
			<template #append>
				<el-button-group class="select-document-template__button-group">
					<el-button
						icon="Close"
						@click="clear"
					/>
					<el-button
						type="primary"
						@click="openTreeModal"
					>
						Выбрать
					</el-button>
				</el-button-group>
			</template>
		</el-input>
		<template v-if="_template">
			<el-link
				type="primary"
				:underline="false"
				@click="openRequirementsModal"
				class="select-document-template__link"
				v-if="_template.requirements"
			>
				Показать требования маршрута
			</el-link>
			<el-text
				v-else
				type="info"
				class="select-document-template__not-requirements"
			>
				Требования маршрута не заданы
			</el-text>
		</template>
		<TreeModal
			v-model="show"
			@change="handleChangeTmpDoc"
		/>
	</div>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import TreeModal from './TreeModal.vue';

import { TEMPLATE_REQUIREMENTS } from "@documents/common/shared/symbols";
import { provideLocal } from '@vueuse/core';

const themeTitle = defineModel('themeTitle', { required: false, default: '' });
const tmpDocId = defineModel('tmpDocId', { required: false, default: null });
const _template = ref(null);

const emit = defineEmits(['changeTemplate', 'resetTemplate']);
const props = defineProps({
	documentType: {
		type: Number,
		required: true,
	},
	forceDisabled: {
		type: Boolean,
		default: false,
	}
});

const router = useRouter();

const show = ref(false);
const disabled = ref(false);

const openTreeModal = () => {
	show.value = true;
};

const clear = () => {
	if (tmpDocId.value) {
		emit('resetTemplate');
	}

	themeTitle.value = '';
	tmpDocId.value = null;
	disabled.value = false;
	_template.value = null;
};

const handleChangeTmpDoc = (template) => {
	tmpDocId.value = template.id;
	themeTitle.value = template.title;
	disabled.value = true;

	_template.value = template;
	emit('changeTemplate', template);
};

const openRequirementsModal = () => {
	if (!_template.value) return;

	const routeData = router.resolve({
		name: TEMPLATE_REQUIREMENTS,
		params: { id: _template.value.id },

	});

	window.open(routeData.href, '_blank');

};

provideLocal('documentType', props.documentType);
</script>
<style lang="scss" scoped>
.select-document-template {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	flex: 1;

	&__button-group {
		display: flex;
		flex-wrap: nowrap;
	}

	&__link {
		// 
	}

	&__not-requirements {
		width: 100%;
	}
}
</style>