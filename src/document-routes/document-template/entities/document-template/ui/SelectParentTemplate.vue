<template>
	<el-input
		v-model="parentsView"
		readonly
		@click="handleClickSelectButton"
		:disabled="disabled"
	>
		<template #append>
			<el-button
				:type="disabled ? 'default' : 'primary'"
				icon="FolderOpened"
				class="select-partition-button"
				@click="handleClickSelectButton"
				:disabled="disabled"
			>
				Выбрать
			</el-button>
		</template>
	</el-input>

	<SelectParentModal
		:route-id="routeId"
		:template-id="templateId"
		v-model:show="showParentModal"
		v-model:result="result"
		v-model:current-parents="parents"
		@change="handleChangeParent"
	/>
</template>
<script setup>
import { ref, watch } from 'vue';
import SelectParentModal from './SelectParentModal.vue';

const result = defineModel('result', { required: true, type: Array });
const parents = defineModel({ default: [] });
const emit = defineEmits(['change']);

const props = defineProps({
	disabled: {
		type: Boolean,
		default: false,
	},
	routeId: {
		required: true,
		type: Number,
	},
	templateId: {
		required: false,
		type: Number,
	}
});

const showParentModal = ref(false);
const parentsView = ref([]);

const handleChangeParent = (_parents, _result) => {
	parents.value = _parents;
	result.value = _result;
	showParentModal.value = false;
};

const handleClickSelectButton = () => {
	showParentModal.value = true;
};

watch(() => parents.value, parents => {
	parentsView.value = parents.map(template => template.title).join(', ');
}, { immediate: true });
</script>