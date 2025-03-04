<template>
	<el-dialog
		v-model="show"
		title="Выбор шаблона документа"
	>
		<el-scrollbar
			max-height="400px"
			v-if="partitionsTree.length"
		>
			<SearchTemplates
				class="search-templates"
				:partitions-tree="partitionsTree"
				@change="handleSearchTemplates"
				v-model:is-active-search="isActiveSearch"
				v-model="activeDocumentTemplate"
			/>
			<PartitionList
				:partitions="partitionsTree"
				v-model="activeDocumentTemplate"
				class="tree-modal__list"
				v-if="!isActiveSearch"
			/>
		</el-scrollbar>
		<el-empty
			:image-size="100"
			description="Нет активных шаблонов документов!"
			v-else
		/>
		<template #footer>
			<div>
				<el-button @click="handleCancel">
					Отмена
				</el-button>
				<el-button
					:type="!activeDocumentTemplate ? 'default' : 'primary'"
					@click="handleSelect"
					:disabled="!activeDocumentTemplate"
				>
					Выбрать
				</el-button>
			</div>
		</template>
	</el-dialog>
</template>

<script setup>
import { ref } from 'vue';
import PartitionList from './PartitionList.vue';
import { usePartitionTree } from '@/document-routes';
import SearchTemplates from './SearchTemplates.vue';

const { getTreeForSelectTemplate } = usePartitionTree();

const show = defineModel({ required: true });
const emit = defineEmits(['change']);

const activeDocumentTemplate = ref(null);
const isActiveSearch = ref(false);
const partitionsTree = ref([]);
const templates = ref([]);

const handleSelect = () => {
	show.value = false;
	emit('change', activeDocumentTemplate.value);
};

const handleCancel = () => {
	show.value = false;
};

const handleSearchTemplates = (result) => {
	templates.value = result;
};

partitionsTree.value = await getTreeForSelectTemplate();
</script>
<style scoped lang="scss">
.tree-modal {
	&__list {
		padding-left: 0;
	}
}
</style>