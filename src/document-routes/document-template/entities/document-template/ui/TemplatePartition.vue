<template>
    <el-card class="template-partition">
        <template #header>
            <div>
                <span>
                    Управление папками
                </span>
            </div>
        </template>

        <div class="template-partition__content">
            <div class="template-partition__title">
                <el-input v-model="templatePartition.title" />
            </div>

            <div>
                <el-button-group>
                    <el-button
                        @click="addTemplatePartition"
                        type="primary"
                        icon="Plus"
                        :disabled="!templatePartition.title"
                    />
                    <el-button
                        v-if="templatePartition.parent_type == 'partition'"
                        @click="editTemplatePartition"
                        type="info"
                        icon="Edit"
                        :disabled="!templatePartition.title"
                    />
                    <el-button
                        v-if="templatePartition.parent_type == 'partition'"
                        @click="deleteTemplatePartition"
                        type="danger"
                        icon="Delete"
                        :disabled="!templatePartition.canDelete"
                    />
                </el-button-group>
            </div>
        </div>
    </el-card>
</template>
<script setup>

import { TemplatePartitionRepo } from "@document-routes/document-template/entities/document-template";
import { useDocumentTemplate } from "@document-routes/document-template/entities/document-template";
import { ElMessageBox } from 'element-plus';
import { notify } from '@common/shared/utils';

const props = defineProps({
    routeId: {
        type: Number,
        require: true
    },
    templatePartition: {
        type: Object,
        require: true
    }
});

const emit = defineEmits(['change']);

const { loading } = useDocumentTemplate();

const addTemplatePartition = async () => {
    try {
        loading.value = true;
        let res = await TemplatePartitionRepo.create({
            title: props.templatePartition.title,
            route_id: props.routeId,
            root_id: props.templatePartition.root_id,
            parent_id: props.templatePartition.parent_id,
            parent_type: props.templatePartition.parent_type,
            parent_template_id: props.templatePartition.parent_template_id,
        });

        emit('change', res, 'add');
    } catch (e) {
        loading.value = false;
        notify.error(e.message);
        throw e;
    }    
};

const editTemplatePartition = async () => {
    try {
        loading.value = true;
        let res = await TemplatePartitionRepo.edit({
            title: props.templatePartition.title,
            route_id: props.routeId,
            root_id: props.templatePartition.root_id,
            parent_id: props.templatePartition.pivot_parent_id,
            template_partition_id: props.templatePartition.parent_id,
            parent_template_id: props.templatePartition.parent_template_id,
        });

        emit('change', res, 'edit');

    } catch (e) {
        loading.value = false;
        notify.error(e.message);
        throw e;
    }
    finally {
        loading.value = false;
    }

};

const deleteTemplatePartition = async () => {
    ElMessageBox.confirm(`Вы уверены, что хотите удалить папку ${props.templatePartition.parent_title} ?`, {
        type: 'warning',
        callback: async (action) => {
            if (action !== 'confirm') {
                return;
            }
            try {
                loading.value = true;
                let res = await TemplatePartitionRepo.delete({
                    route_id: props.routeId,
                    root_id: props.templatePartition.root_id,
                    parent_id: props.templatePartition.parent_id,
                    template_partition_id: props.templatePartition.parent_id,
                });

                emit('change', res, 'delete');
            } catch (e) {
                loading.value = false;
                notify.error(e.message);
                throw e;
            }           
        },
    });
};

</script>

<style scoped lang="scss">
.template-partition ::v-deep(.el-card__header) {
    padding: 0 0 0 10px;
}

.template-partition ::v-deep(.el-card__body) {
    padding: 10px;
}

.template-partition {

    &__content {
        display: flex;
        gap: 5px;
    }

    &__title {
        flex: 1 1
    }
}
</style>