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
		v-model:show="showParentModal"
		v-model:result="result"
		:route-id="routeId"
		:template-id="templateId"
		v-model:current-parents="parents"
		@change="handleChangeParent"
	/>
	
</template>
<script setup>
import { ref, watch } from 'vue';
import SelectParentModal from './SelectParentModal.vue';

const result = defineModel('result', { required: true, type: Array });

const parents = defineModel('parents', { required: true, type: Array });

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
	},
});

defineExpose({
	clearParentsView: () => {		
		parentsView.value = [];	
	},
});

const showParentModal = ref(false);
const parentsView = ref([]);

const handleChangeParent = () => {	
	parentsView.value = result.value.map(item => item.parent_template_title).join(', ');		
	showParentModal.value = false;	
};

const handleClickSelectButton = () => {
	showParentModal.value = true;
};

parentsView.value = parents.value.map(item => `${item?.type?.title} ${item?.title}`).join(', ');		

</script>