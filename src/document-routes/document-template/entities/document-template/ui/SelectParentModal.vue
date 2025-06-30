<template>

	<el-dialog v-model="show">

		<template #header>
			<div class="select-parent-modal__header">
				<span class="select-parent-modal__head">Выбор шаблона родительского документа</span>
				<el-tooltip
					content="Установка двух или более родительских шаблонов в одном корневом элементе запрещена!"
					placement="bottom-start"
				>
					<el-icon>
						<QuestionFilled />
					</el-icon>
				</el-tooltip>
			</div>
		</template>
		<Preloader
			:loading="loading"
			loadingText="Управление папкой"
		>

			<el-alert
				:closable="false"
				type="warning"
				class="select-parent-modal__alert"
				v-if="childIds.length"
			>
				Внимание: текущий шаблон имеет дочерние элементы. Изменение родительской структуры невозможно во
				избежание
				нарушения
				целостности шаблона документа.
			</el-alert>
			<el-scrollbar max-height="400px">
				<el-tree
					:data="documentTemplatesTree"
					:props="{ label: 'title', children: 'children', disabled: disableItems }"
					@check-change="handleChangeNode"
					class="parent-tree"
					node-key="branch_id"
					:default-checked-keys="currentParentIds"
					:default-expanded-keys="currentParentIds"
					check-strictly
					show-checkbox
					ref="treeRef"
				>
					<template #default="{ data }">
						<div
							v-if="!data?.pivot || data?.pivot?.child_template_type == 'template'"
							class="parent-tree__title"
						>
							<el-icon>
								<Document />
							</el-icon>
							<span :class="{ 'parent-tree--is-current': data.id === templateId }">
								{{ `${data.type.title}. ${data.title}` }}
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
							<span :class="{ 'parent-tree--is-current': data.id === templateId }">
								{{ `${data.title}` }}
							</span>
						</div>

					</template>
				</el-tree>
			</el-scrollbar>

			<TemplatePartition
				v-if="result.length == 1"
				:templatePartition="templatePartition"
				:routeId="routeId"
				class="template-partition"
				@change="changeTemplatePartition"
			/>
			<div
				v-else
				class="selection-hint"
			>
				<el-icon
					:size="16"
					class="hint-icon"
				><info-filled /></el-icon>
				<span class="hint-text">Выберите один элемент структуры если необходимо управление папками</span>
			</div>
		</Preloader>

		<template #footer>
			<el-button
				@click="handleOkClick"
				:type="!parents.length || childIds.length || loading > 0 ? 'default' : 'primary'"
				:disabled="!parents.length || childIds.length > 0 || loading"
			>
				Выбрать
			</el-button>
		</template>

	</el-dialog>

</template>

<script setup>
import { computed, ref, watch, reactive } from "vue";
import { Preloader } from '@common/shared/ui';
import { notify } from '@common/shared/utils';
import { useDocumentTemplate } from "@document-routes/document-template/entities/document-template";
import { TemplatePartition } from "@document-routes/document-template/entities/document-template";

const result = defineModel('result', { required: true, type: Array });
const currentParents = defineModel('currentParents', { required: true, type: Array });

const props = defineProps({
	routeId: {
		type: Number,
		require: true
	},
	templateId: {
		required: false,
		type: Number,
	},
});
const emit = defineEmits(['change']);

const show = defineModel('show', { default: false });

const currentParentIds = computed(() => currentParents.value.map(item => item.branch_id));

const treeRef = ref(null);
const parents = ref([]);

const currentParentsWasChange = ref(false);//ключ чтоб ватч сработал только раз при изначальной загрузке страницы

const childIds = ref([]);
const templatePartition = reactive({
	title: '',
	parent_id: null,
	pivot_parent_id: null,
	root_id: null,
	parent_type: null,
	parent_template_id: null,
	canDelete: false,
	parent_title: '',
});

const { documentTemplatesTree, initDocumentTemplatesTree, loading } = useDocumentTemplate();

await initDocumentTemplatesTree(props.routeId);

const getChildrenRecursive = (parents, templateId) => {
	const items = [];
	const result = [];

	const search = (parents) => {
		for (const parent of parents) {
			if (parent.id === templateId) {
				items.push(parent);
			}

			if (parent.children && parent.children.length) {
				for (const child of parent.children) {
					if (child.id === templateId) {
						items.push(child);
					} else {
						search(child.children);
					}
				}
			}
		}
	};

	const flatten = (items) => {
		for (const item of items) {
			result.push(item);
			if (item.children && item.children.length) {
				flatten(item.children);
			}
		}
	};

	search(parents);
	flatten(items);

	return result.filter(item => item.id !== props.templateId);
};

childIds.value = getChildrenRecursive(documentTemplatesTree.value, props.templateId)
	.map(item => item.id);

const disableItems = (item) => {
	if (childIds.value.length) {
		return true;
	}

	if (result.value.find(savedItem => savedItem.parent_id == item.id && savedItem.root_id == (item.root_template_id || item.pivot.root_template_id))) {
		return false;
	}

	if (result.value.find(savedItem => savedItem.root_id == (item.root_template_id || item.pivot.root_template_id))) {
		return true;
	}

	return [props.templateId, ...childIds.value].includes(item.id);
};

const searchRootItem = (tree, item) => {
	for (const rootItem of tree) {
		if (rootItem === item) {
			return rootItem;
		}

		if (searchRootItem(rootItem.children, item)) {
			return rootItem;
		}
	}

	return null;
};

const handleChangeNode = (item, checked) => {

	const root = searchRootItem(documentTemplatesTree.value, item);

	if (checked) {

		result.value.push({
			root_id: root.id,
			parent_id: item.id,
			title: item?.pivot?.child_template_type == 'partition' ? item.title : '',
			pivot_parent_id: item?.pivot?.parent_template_id,
			parent_type: root.id == item.id ? 'template' : item?.pivot?.child_template_type,
			parent_template_id: (!item.pivot || item?.pivot?.child_template_type == 'template') ? item.id : item?.parent_template.id,
			parent_template_title: (!item.pivot || item?.pivot?.child_template_type == 'template') ? `${item?.type.title} ${item?.title}` : `${item?.parent_template?.type.title} ${item?.parent_template?.title}`,
			canDelete: !item.children.length,
		});

	} else {
		result.value = result.value.filter(savedItem => !(savedItem.root_id === root.id && savedItem.parent_id === item.id));

		currentParents.value = currentParents.value.filter(savedItem => savedItem.branch_id != item.branch_id);
	}

	parents.value = treeRef.value.getCheckedNodes();
};

const handleOkClick = () => {
	emit('change');
};

const changeTemplatePartition = async (res, action) => {
	try {

		let checkPartition = treeRef.value.getCheckedNodes();

		if (action == 'edit') {

			checkPartition[0].title = templatePartition.title;

		} else {

			let branch_id = `${templatePartition?.pivot_parent_id}${templatePartition?.root_id}`;//для случая с удалением

			currentParentsWasChange.value = true;//ключ чтоб ватч сработал только рах при изначальной загрузке страницы
			result.value = []; // именно в таком порядке! есть ватч который очистит templatePartition смотря на result
			currentParents.value = [];//не удалять, полюбому нужно, иначе остается у дерева чекнутая галочка у прошлого элемента

			await initDocumentTemplatesTree(props.routeId);

			if (action == 'delete') currentParents.value = [{ branch_id: branch_id }]
			else currentParents.value = res?.branch_id ? [{ branch_id: res.branch_id }] : [];

		}

	} catch (e) {
		loading.value = false;
		notify.error(e.message);
		throw e;
	}
};

watch(() => result.value.length, () => {
	if (!result.value.length || result.value.length > 1) {
		templatePartition.title = '';
		templatePartition.root_id = null;
		templatePartition.parent_id = null;
		templatePartition.pivot_parent_id = null;
		templatePartition.parent_template_id = null;
		templatePartition.parent_type = null;
		templatePartition.canDelete = false;
		templatePartition.parent_title = '';
	};
	if (result.value.length == 1) {
		templatePartition.title = result.value[0].title;
		templatePartition.root_id = result.value[0].root_id;
		templatePartition.parent_id = result.value[0].parent_id;
		templatePartition.pivot_parent_id = result.value[0].pivot_parent_id;
		templatePartition.parent_template_id = result.value[0].parent_template_id;
		templatePartition.parent_type = result.value[0].parent_type;
		templatePartition.canDelete = result.value[0].canDelete;
		templatePartition.parent_title = result.value[0].parent_title;
	}
});


watch(() => currentParents.value, (currentParents) => {	

	if (!currentParentsWasChange.value) {

		result.value = currentParents.map(currentParent => {

			return {
				root_id: currentParent.root_id,
				parent_id: currentParent.parent_id,
				parent_type: currentParent.parent_type,
				parent_title: currentParent.title
			};

		});		

	}

}, { immediate: true });

</script>

<style>
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

.parent-tree--is-current {
	color: var(--el-color-primary-dark-2);
}

.select-parent-modal__header {
	display: flex;
	align-items: center;
	gap: 0.5rem;
	flex-wrap: wrap;
}

.select-parent-modal__head {
	font-size: 1.1rem;
	font-weight: bold;
}

.select-parent-modal__alert {
	margin-bottom: 1rem;
}

.template-partition {
	margin-top: 10px;
}

.parent-tree__title {
	display: flex;
	gap: 5px;
	align-items: center;
}

.selection-hint {
	margin-top: 10px;
	display: flex;
	align-items: center;
	gap: 8px;
	padding: 5px;
	background-color: #f4f4f5;
	border-radius: 4px;
	color: #909399;
}

.hint-icon {
	color: #409eff;
}

.hint-text {
	font-size: 14px;
}
</style>