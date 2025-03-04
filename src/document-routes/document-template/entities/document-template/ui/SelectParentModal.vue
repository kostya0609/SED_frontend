<template>
	<el-dialog v-model="show">
		<template #header>
			<div class="select-parent-modal__header">
				<span class="select-parent-modal__head">Выбор шаблона родительского документа</span>
				<el-tooltip
					content="Утановка двух или более родительских шаблонов в одном корневом элементе запрещена!"
					placement="bottom-start"
				>
					<el-icon>
						<QuestionFilled />
					</el-icon>
				</el-tooltip>
			</div>
		</template>
		<el-alert
			:closable="false"
			type="warning"
			class="select-parent-modal__alert"
			v-if="childIds.length"
		>
			Внимание: текущий шаблон имеет дочерние элементы. Изменение родительской структуры невозможно во избежание
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
				:key="treeKey"
			>
				<template #default="{ data }">
					<span :class="{ 'parent-tree--is-current': data.id === templateId }">
						{{ `${data.type.title}. ${data.title}` }}
					</span>
				</template>
			</el-tree>
		</el-scrollbar>
		<template #footer>
			<el-button
				@click="handleOkClick"
				:type="!parents.length || childIds.length > 0 ? 'default' : 'primary'"
				:disabled="!parents.length || childIds.length > 0"
			>
				Выбрать
			</el-button>
		</template>

	</el-dialog>

</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useDocumentTemplate } from "@document-routes/document-template/entities/document-template";

const props = defineProps({
	routeId: {
		type: Number,
		require: true
	},
	templateId: {
		required: false,
		type: Number,
	}
});
const emit = defineEmits(['change']);

const show = defineModel('show', { default: false });

const currentParents = defineModel('currentParents', { default: [] });
const currentParentIds = computed(() => currentParents.value.map(item => item.branch_id));

/** КОСТЫЛЬ: Очищает дерево, когда выбранные элементы пустой массив */
const treeKey = computed(() => Math.random() + currentParentIds.value.length);

const treeRef = ref();
const parents = ref([]);
const result = defineModel('result', { required: true, type: Array });
const childIds = ref([]);

const { documentTemplatesTree, initDocumentTemplatesTree } = useDocumentTemplate();

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
		});
	} else {
		result.value = result.value.filter(savedItem => !(savedItem.root_id === root.id && savedItem.parent_id === item.id));
	}

	parents.value = treeRef.value.getCheckedNodes();
};

const handleOkClick = () => {
	emit('change', parents.value, result.value);
};

watch(() => currentParents.value, (currentParents) => {
	result.value = currentParents.map(currentParent => {
		const root_id = currentParent.pivot ? currentParent.pivot.root_template_id : currentParent.root_template_id;
		return {
			root_id,
			parent_id: currentParent.id,
		};
	});
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
</style>