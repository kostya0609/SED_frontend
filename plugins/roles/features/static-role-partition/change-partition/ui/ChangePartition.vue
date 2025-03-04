<template>
    <el-dialog
        v-model="show"
        title="Редактирование раздела"
    >
        <el-form
            :model="formData"
            :rules="rules"
            label-width="auto"
            label-position="left"
            ref="form"
            class="form"
        >

            <el-form-item
                label="Наименование раздела"
                class="form__item"
                prop="title"
            >
                <el-input
                    v-model="formData.title"
                    class="mb-3"
                    placeholder="Введите названия раздела"
                />
            </el-form-item>

            <el-button
                type="primary"
                @click="submit"
            >
                Сохранить
            </el-button>

        </el-form>

    </el-dialog>
</template>
<script setup>

import { reactive } from 'vue';
import { useStaticRolePartitionRepo } from '@/plugins/roles/entities/static-role-partition/api';
import { notify } from "@/plugins/roles/shared/utils";

const show = defineModel('show', { default: false });
const props = defineProps({
    title: { type: String },
    id: { type: Number, required: true },
});

const emit = defineEmits(['setLoading']);

const rules = reactive({
    title: { required: true, message: 'Необходимо ввести наименование раздела' },
});

const formData = reactive({
    partition_id: props.id,
    title: props.title,
});

const StaticRolePartitionRepo = useStaticRolePartitionRepo();

const submit = async () => {
    try {
        emit('setLoading', true, false);
        await StaticRolePartitionRepo.update(formData);
        show.value = false;
    } catch (e) {
        notify.fetchError(e.message);
        throw e;
    } finally {
        emit('setLoading', false, true);
    }
};

</script>