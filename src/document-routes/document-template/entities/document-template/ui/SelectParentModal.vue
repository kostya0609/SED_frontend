<template>
    <el-dialog
        v-model="show"
        title="Выбор шаблона родительского документа"
    >
        <el-scrollbar max-height="400px">
            <el-tree
                :data="documentTemplatesTree"
                :props="{ label: 'title', children: 'children' }"
                @node-click="handleNodeClick"
                class="parent-tree"
                highlight-current
                node-key="id"          
                :current-node-key="currentParentId"      
            />
            
            <!-- :default-expanded-keys="currentPartitions" -->


        </el-scrollbar>
        <template #footer>
            <el-button
                type="primary"
                @click="handleOkClick"
                :disabled="!parent"                
            >
            
                Выбрать
            </el-button>
        </template>

    </el-dialog>

</template>

<script setup>
import { computed, ref } from "vue";
import { useDocumentTemplate } from "@document-routes/document-template/entities/document-template";

const props = defineProps({
    routeId: { type: Number, require: true },
});
const emit = defineEmits(['change']);

const show = defineModel('show', { default: false });

const currentParentId = defineModel('currentParentId', { default: null });
const currentParent = computed(() => currentParentId.value ? [currentParent.value] : []);
const parent = ref(null);

const { documentTemplatesTree, initDocumentTemplatesTree } = useDocumentTemplate();

await initDocumentTemplatesTree(props.routeId);

const handleNodeClick = (item) => {
	parent.value = { id: item.id, title: item.title };
};

const handleOkClick = () => {
	emit('change', parent.value);
};

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
</style>