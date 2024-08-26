<template>
	<el-dialog
		v-model="show"
		title="Выбор раздела"
	>
		<el-scrollbar max-height="400px">
			<el-tree
				:data="partitionsTree"
				:props="{ label: 'title', children: 'children' }"
				@node-click="handleNodeClick"
				class="partition-tree"
				highlight-current
				node-key="id"
				:current-node-key="currentPartitionId"
				:default-expanded-keys="currentPartitions"
			/>
		</el-scrollbar>
		<template #footer>
			<el-button
				type="primary"
				@click="handleOkClick"
				:disabled="!partition"
			>
				Выбрать
			</el-button>
		</template>
	</el-dialog>
</template>
<script setup>
import { usePartition } from "@document-routes/partition/entities/partition";
import { computed, ref } from "vue";

const emit = defineEmits(['change']);

const show = defineModel('show', { default: false });
const currentPartitionId = defineModel('currentPartitionId', { default: null });
const currentPartitions = computed(() => currentPartitionId.value ? [currentPartitionId.value] : []);
const partition = ref(null);

const handleNodeClick = (item) => {
	partition.value = { id: item.id, title: item.title };
};

const handleOkClick = () => {
	emit('change', partition.value);
};

const { partitionsTree, initPartitionsTree } = usePartition();

await initPartitionsTree();
</script>
<style>
.partition-tree .el-tree-node:focus>.el-tree-node__content {
	color: var(--el-color-primary);
}

.partition-tree .el-tree-node {
	white-space: normal;
}

.partition-tree.el-tree {
	--el-tree-node-content-height: '';
}

.partition-tree,
.partition-tree .el-tree-node {
	display: flex;
	flex-direction: column;
	gap: 0.25em;
}
</style>