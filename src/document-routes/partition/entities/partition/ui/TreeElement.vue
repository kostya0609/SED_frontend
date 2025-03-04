<template>

    <ul class="tree-element">

        <li
            v-for="partition in partitionsTree"
            :key="partition.id"
            class="tree-element__wraper"
        >

            <div class="tree-element__content">

                <el-icon
                    v-if="partition.children.length || partition.routes.length"
                    class="tree-element__icon-wraper"
                >
                    <ArrowRight
                        @click="partition.show = !partition.show"
                        :class="['tree-element__icon', { 'tree-element__icon_rotate': partition.show }]"
                    />
                </el-icon>

                <el-button
                    link
                    class="tree-element__button"
                    @click="partition.show = !partition.show"
                >
                    {{ partition.title }}
                </el-button>


                <el-dropdown
                    class="tree-element__actions"
                    @command="(command) => handleDropdownCommand(command, partition)"
                >

                    <el-button link type="primary">
                        <el-icon size="20">
                            <Operation />
                        </el-icon>
                    </el-button>

                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item
                                command="editPartition"
                                icon="Edit"
                            >
                                Переименовать раздел
                            </el-dropdown-item>

                            <el-dropdown-item
                                command="addSubPartition"
                                icon="Connection"
                            >
                                Создать подраздел
                            </el-dropdown-item>

                            <el-dropdown-item
                                command="deletePartition"
                                icon="Delete"
                            >
                                Удалить раздел
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>

            </div>

            <TreeElement
                v-if="(partition.children && partition.children.length || partition.routes && partition.routes.length) && partition.show"
                v-model:partitions-tree="partition.children"
                :routes="partition.routes"
                @create="(partition) => emit('create', partition)"
                @edit="(partition) => emit('edit', partition)"
                @delete="(partition) => emit('delete', partition)"
            />
        </li>

        <li
            v-for="route in routes"
            :key="'route_' + route.id"
            class="tree-element__wraper"
        >

            <el-link
                type="primary"
                class="tree-element__link-button"
                :underline=false
                :href="`/sed/admin/document-routes/detail/${route.id}`"
                target="blank"
            >
                {{ route.title }}
            </el-link>

            <el-icon
                v-if="route.document_templates && route.document_templates.length"
                class="tree-route__icon"
            >
                <Hide
                    v-if="route.showTemplate"
                    @click="route.showTemplate = !route.showTemplate"
                />
                <View
                    v-else
                    @click="route.showTemplate = !route.showTemplate"
                />
            </el-icon>

            <TreeSubElement
                v-if="route.document_templates && route.document_templates.length && route.showTemplate"
                :document_templates="route.document_templates"
            />

        </li>
    </ul>

</template>

<script setup>
import { TreeElement, TreeSubElement } from "@document-routes/partition/entities/partition";

const partitionsTree = defineModel('partitionsTree');

const props = defineProps({
    routes: { type: Array, default: [] }
});

const emit = defineEmits(['openModal', 'create', 'edit', 'delete']);

const handleDropdownCommand = async (command, partition) => {

    switch (command) {
        case 'editPartition':
            emit('edit', partition);
            break;

        case 'addSubPartition':
            emit('create', partition);
            break;

        case 'deletePartition':
            emit('delete', partition);
            break;
    }
};

</script>

<style scoped lang="scss">
.tree-element {
    list-style-type: none;
    margin: 0.25rem 0;
}

.tree-element__wraper {
    margin: 0.25rem 0;
}

.tree-element__content {
    display: flex;
    position: relative;
    gap: 0.25rem;
    justify-content: space-between;
}

.tree-element__icon-wraper {
    position: absolute;
    left: -10px;
    top: 50%;
    transform: translate(0, -50%);
    cursor: pointer;
}

.tree-element__icon {
    transition: 0.5s;
}

.tree-element__icon_rotate {
    transform: rotate(90deg);
    transition: 0.5s;
}

.tree-element__button.el-button {
    white-space: normal;
    width: 100%;
    justify-content: flex-start;
    text-align: left;
    padding: 8px 15px
}

.tree-element__button.el-button.is-link:not(.is-disabled):hover {
    background-color: var(--el-fill-color-light);
}

.tree-element__link-button {
    white-space: normal;
    padding: 8px 15px
}

.tree-element__actions {
    flex: 0 0 auto;
}

.tree-route {
    &__icon {
        cursor: pointer;
        vertical-align: middle;
        margin-left: .5rem;
    }
}
</style>
