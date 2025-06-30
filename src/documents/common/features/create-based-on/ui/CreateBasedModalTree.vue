<template>
	<el-drawer
		v-model="show"
		class="based-modal"
		size="50%"
	>
		<template #header>
			<div class="based-modal__title">Создание документов на основании {{ document.number }}</div>
		</template>
		<div class="based-modal__inner">

			<el-scrollbar max-height="400px">
				<el-tree
					:data="templates"
					:props="{ label: 'title', children: 'children', disabled: disableItems }"
					@check-change="handleChangeNode"
					class="parent-tree"
					node-key="branch_id"
					check-strictly
					show-checkbox
					ref="treeRef"	
					:key="treeKey"				
				>
					<template #default="{ data }">
						<div
							v-if="!data?.pivot || data?.pivot?.child_template_type == 'template'"
							class="parent-tree__title"
						>
							<el-icon>
								<Document />
							</el-icon>
							<span>
								{{ (data?.type?.title ? data.type.title + '.' : '') + ' ' + data.title }}
							</span>
						</div>

						<div
							v-if="data?.pivot?.child_template_type == 'partition'"
							class="parent-tree__title"
						>
							<el-icon
								size="16"
								color="orange"
								title="Подраздел"
							>
								<Folder />
							</el-icon>
							<span>
								{{ `${data.title}` }}
							</span>
						</div>

					</template>
				</el-tree>
			</el-scrollbar>
		</div>

		<template #footer>

			<el-space class="mt-3">

				<el-button @click="show = false">
					Отмена
				</el-button>

				<el-button
					:type="disabledCreateButton ? 'default' : 'primary'"
					@click="handleOkClick"
					:disabled="disabledCreateButton"
				>
					Создать
				</el-button>

			</el-space>

		</template>
		
	</el-drawer>
</template>

<script setup>
import { computed, ref } from 'vue';
import { DocumentTypeRepo } from '@documents/common/shared/api';
import { notify } from "@common/shared/utils";
import { DocumentTemplateRepo } from '@/documents/common/entities/document-template/shared/api';
import { DOCUMENT_TYPE } from '@/documents/common/shared/constants';

const show = defineModel('show', { default: false });
const props = defineProps({
	document: { type: Object },
	create: {
		type: Function,
		required: true,
	}
});

const templates = ref([]);

const treeVersion = ref(0);// костыль чтоб очистить дерево после создания документов
const treeRef = ref();

const treeKey = computed(() => `tree-${treeVersion.value}`);

const handleChangeNode = (item, checked) => {
	if (checked) {

		if (item.selectedType) selectedType.value.push(item.id)
		else checkTmpDocs.value.push(item.id);

	} else {

		if (item.selectedType) selectedType.value = selectedType.value.filter(savedItem => savedItem != item.id);
		else checkTmpDocs.value = checkTmpDocs.value.filter(savedItem => savedItem != item.id);

	}
};

const disableItems = (item) => item?.pivot?.child_template_type == 'partition' ? true : false;

const documentTypes = ref(null);

const checkTmpDocs = ref([]);

const selectedType = ref([]);

const disabledCreateButton = computed(() => !checkTmpDocs.value.length && !selectedType.value.length);

const handleOkClick = async () => {
	show.value = false;

	await props.create({
		common_document_id: props.document.common_document_id,
		checkTmpDocs,
		selectedType,
		documentHierarchyId: props.document.document_hierarchy_id,
	});

	checkTmpDocs.value = [];
	selectedType.value = [];	
	treeVersion.value++;	
};

try {
	documentTypes.value = await DocumentTypeRepo.list();

	/** Оставляем только ознакомление */
	documentTypes.value = documentTypes.value.filter(({ id }) => id === DOCUMENT_TYPE.REVIEW);

	if (props.document.hierarchy.length && props.document.tmp_doc_id) {
		templates.value = await DocumentTemplateRepo.getTreeTemplates({
			template_id: props.document.tmp_doc_id,
			common_start_document_id: props.document.hierarchy[0].start_document_id,
		});

		templates.value.push(...documentTypes.value.map(el => ({ ...el, selectedType: true })))
	}
} catch (e) {
	notify.fetchError(e.message);
	throw e;
}

</script>
<style lang="scss" scoped>
.based-modal {
	&__title {
		font-weight: bold;
	}

	&__checkbox {
		display: flex;
		flex-direction: column;
	}

	&__divider {
		margin: 14px 0;
	}

	&__inner {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		gap: 1rem;
	}
}

:global(.based-modal .el-drawer__body) {
	height: 100%;
}

.checkbox-group {
	&__item {
		width: 100%;
		background-color: #FFF;
		padding: 3px 0 3px var(--el-drawer-padding-primary);
		white-space: normal;
	}

	&__item:nth-child(odd) {
		background-color: var(--el-color-info-light-9);
	}
}



.parent-tree .el-tree-node:focus>.el-tree-node__content {
	color: var(--el-color-primary);
}

.parent-tree .el-tree-node {
	white-space: normal;
}

.parent-tree.el-tree {
	--el-tree-node-content-height: '';
}

.parent-tree,
.parent-tree .el-tree-node {
	display: flex;
	flex-direction: column;
	gap: 0.25em;
}

.parent-tree__title {
	display: flex;
	gap: 5px;
	align-items: center;
}
</style>