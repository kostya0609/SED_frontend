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
				node-key="id"
				:current-node-key="currentPartitionId"
				:default-expanded-keys="currentPartitions"
				:expand-on-click-node="false"
			>
				<template #default="{ node, data }">

					<div class="partition-tree_wraper">

						<div class="partition-tree__title">

							<el-button
								:class="['partition-tree__title-button', { 'partition-tree__title-button_selected': selectNode == data }]"
								link
							>
								{{ data.title }}
							</el-button>

							<el-popover
								v-if="data.routes && data.routes.length && data.showRoutes"
								placement="top-start"
								trigger="hover"
								content="скрыть маршруты"
							>
								<template #reference>
									<el-icon class="partition-tree__icon">
										<Hide @click="data.showRoutes = !data.showRoutes;" />
									</el-icon>
								</template>

							</el-popover>

							<el-popover
								v-if="data.routes && data.routes.length && !data.showRoutes"
								placement="top-start"
								trigger="hover"
								content="показать маршруты"
							>
								<template #reference>
									<el-icon class="partition-tree__icon">
										<View @click="data.showRoutes = !data.showRoutes;" />
									</el-icon>
								</template>

							</el-popover>
							
						</div>

						<ul
							v-if="data.showRoutes"
							class="partition-tree_routes"
						>
							<li
								v-for="route in data.routes"
								:key="route.id"
								class="partition-tree_routes-items"
							>
								<el-link
									v-if="data.routes && data.routes.length"
									class="partition-tree__title-link"
									type="primary"
									:underline=false
									:href="`/sed/admin/document-routes/detail/${route.id}`"
									target="blank"
								>
									{{ route.title }}
								</el-link>

							</li>
						</ul>

					</div>

				</template>
			</el-tree>
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
import { usePartitionTree } from "@document-routes/partition/entities/partition";
import { computed, ref } from "vue";

const emit = defineEmits(['change']);

const show = defineModel('show', { default: false });
const currentPartitionId = defineModel('currentPartitionId', { default: null });
const currentPartitions = computed(() => currentPartitionId.value ? [currentPartitionId.value] : []);
const partition = ref(null);
const selectNode = ref(null);

const handleNodeClick = (item) => {
	partition.value = { id: item.id, title: item.title };
	selectNode.value = item;
};

const handleOkClick = () => {
	emit('change', partition.value);
};

const { partitionsTree, initPartitionsTree } = usePartitionTree();

await initPartitionsTree();

</script>
<style scoped>
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

.partition-tree ::v-deep(.el-tree-node__expand-icon) {
	padding: 8px 6px;
}

.partition-tree_wraper {
	
}

.partition-tree ::v-deep(.el-tree-node__content) {
	align-items: flex-start;
}

.partition-tree_routes {
	list-style-type: none;
	margin: 0;
}

.partition-tree_routes-items {
	padding: 8px 0px;
}

.partition-tree__title {
	display: flex;
	gap: .5rem;
	align-items: center;
}

.partition-tree__title-button {
	white-space: normal;
	width: 100%;
	justify-content: flex-start;
	text-align: left;
	padding: 8px 15px
}

.partition-tree__title-button_selected {
	color: #3bc8f5 !important;
	background-color: var(--el-tree-node-hover-bg-color);
}

.partition-tree__icon{
	cursor: pointer;
}

.partition-tree__title-link {
	white-space: normal;
}
</style>