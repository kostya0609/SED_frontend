<template>
    <el-tree
        class="tree"
        v-if="data && data.length"
        node-key="id"
        :data="data"
        :props="{ label: 'title', children: 'children' }"
        :default-expanded-keys="[+$route.params.partition_id]"
        @node-click="clickPartition"
    >
        <template #default="{ node, data }">

            <div class="tree__item">
                {{ node.label }}
            </div>

            <el-dropdown @command="(command) => handleDropdownCommand(command, data)">
                <span class="el-dropdown-link">
                    <el-icon>
                        <More />
                    </el-icon>
                </span>

                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item
                            command="edit"
                            icon="Edit"
                        >
                            Изменить
                        </el-dropdown-item>

                        <el-dropdown-item
                            command="delete"
                            icon="Delete"
                        >
                            Удалить
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>

        </template>
    </el-tree>
    <el-empty
        v-else
        description="Нет данных"
    />

</template>

<script setup>

const props = defineProps({
    data: { type: Array, default: [] },
});

const emit = defineEmits(['click', 'edit', 'delete']);

const clickPartition = (partition) => {
    emit('click', partition);
};

const handleDropdownCommand = async (command, partition) => {

    switch (command) {
        case 'edit':
            emit('edit', partition);
            break;

        case 'delete':
            emit('delete', partition);
            break;
    }
};

</script>

<style scoped lang="scss">
.tree {
    &__item {
        flex: 1;
        margin-right: 10px;
    }
}

.el-dropdown-link {
    cursor: pointer;
    color: var(--el-color-primary);
    display: flex;
    align-items: center;
}

.el-dropdown-link:focus-visible {
    outline: none;
}

.tree ::v-deep(.el-tree-node__content) {
    height: auto!important;
}

.tree ::v-deep(.el-tree-node) {
    white-space:normal!important;
}
</style>