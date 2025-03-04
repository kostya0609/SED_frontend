<template>
	<div>
		<input
			v-model="query"
			placeholder="Поиск шаблона документа"
			clearable
			class="search-templates__input"
		/>
		<PartitionList
			:templates="templates"
			class="search-templates__list"
			v-model="activeDocumentTemplate"
		/>
		<el-empty
			:image-size="100"
			description="Ничего не найдено!"
			v-if="isActiveSearch && !templates.length"
		/>
	</div>
</template>
<script setup>
import { ref, watch } from 'vue';
import PartitionList from './PartitionList.vue';
import { injectLocal } from '@vueuse/core';

const documentType = injectLocal('documentType');

const query = ref('');
const templates = ref([]);

const activeDocumentTemplate = defineModel({ type: Object, default: null });
const isActiveSearch = defineModel('isActiveSearch', { type: Boolean, default: false });

const props = defineProps({
	partitionsTree: Array,
});

const emit = defineEmits(['change']);

/**
 * @param {any[]} partitions
 */
const searchTemplates = (partitions, query) => {
	partitions.forEach((partition) => {
		if (partition.routes.length) {
			partition.routes.forEach((route) => {
				route.document_templates.forEach((template) => {
					if (template.title.toLowerCase().includes(`${query}`.trim().toLowerCase()) && documentType === template.type_id) {
						templates.value.push(template);
					}
				});
			});
		}

		if (partition.children) {
			searchTemplates(partition.children, query);
		}
	});
};

watch(() => query.value, (query) => {
	templates.value = [];

	if (query) {
		searchTemplates(props.partitionsTree, query);
		isActiveSearch.value = true;
	} else {
		isActiveSearch.value = false;
	}

	emit('change', templates.value);
});
</script>
<style lang="scss" scoped>
.search-templates {
	&__input {
		width: 100%;
		border: none;
		border-bottom: 1px solid var(--el-border-color);
		padding: .5rem;
		box-sizing: border-box;
		transition: .3s;

		&:focus {
			outline: none;
			border-bottom-color: var(--el-border-color-darker);
			transition: .3s;
		}

		&::placeholder {
			color: #BBB;
		}
	}

	&__list {
		padding-left: 0;
	}
}
</style>