<template>
    <Preloader :loading="loading">
        <TreeElement
            v-if="partitionsTree && partitionsTree.length"
            v-model:partitions-tree="partitionsTree"
            class="partition-tree-structure"
            @create="createSubPartition"
            @edit="editPartition"
            @delete="deletePartitionMsg"
        />

        <PartitionModal
            v-if="partitionModalAttrs.show"
            v-model:show="partitionModalAttrs.show"
            :title="partitionModalAttrs.title"
            :mode="partitionModalAttrs.mode"
            :data="partitionModalAttrs.data"
            :partitionsTree="partitionModalAttrs.mode == 'createPartition' ? partitionsTree : []"
            @updateTree="updatePartitionsTree"
        />

    </Preloader>
</template>
<script setup>
import { Preloader } from '@common/shared/ui';
import { usePartitionTree, TreeElement, PartitionModal } from "@document-routes/partition/entities/partition";

import { useActionButtons } from '@/plugins/menu';
import { onMounted, onUnmounted, reactive, ref } from 'vue';
import { ElMessageBox } from 'element-plus';

const { partitionsTree, initPartitionsTree, loading, deletePartition } = usePartitionTree();

const { addButton, clearButtons } = useActionButtons();

const partitionModalAttrs = reactive({
    title: 'Создание раздела',
    show: false,
    mode: 'create',
    data: { id: null, title: null, parent_id: null },
});

await initPartitionsTree();

const updatePartitionsTree = async () => {
    partitionModalAttrs.show = false;
    await initPartitionsTree();
};

const createPartition = () => {
    partitionModalAttrs.title = 'Создание раздела';
    partitionModalAttrs.mode = 'createPartition';

    partitionModalAttrs.show = true;
};

const createSubPartition = (partition) => {

    partitionModalAttrs.title = 'Создание подраздела';
    partitionModalAttrs.mode = 'createSubPartition';

    partitionModalAttrs.data.parent_id = partition.id;
    partitionModalAttrs.data.title = partition.title;

    partitionModalAttrs.show = true;
};

const editPartition = (partition) => {
    partitionModalAttrs.title = 'Переименование раздела';
    partitionModalAttrs.mode = 'editPartition';

    partitionModalAttrs.data.id = partition.id;
    partitionModalAttrs.data.title = partition.title;

    partitionModalAttrs.show = true;
};

const deletePartitionMsg = (partition) => {

    ElMessageBox.confirm(`Вы уверены, что хотите удалить раздел ${partition.title} ?`, {
        type: 'warning',
        callback: async (action) => {
            if (action !== 'confirm') {
                return;
            }

            await deletePartition({ id: partition.id });
            await initPartitionsTree();
        },
    });
};

onMounted(() => {
    addButton({
        title: 'Создать раздел',
        onClick: createPartition,
    });
    addButton({
		icon: 'Back',
		path: '/sed/',
		type: 'default'
	});

});

onUnmounted(() => {
    clearButtons();
});

</script>
<style scoped>
.partition-tree-structure {
    min-width: 800px;
    max-width: 50%;
}
</style>