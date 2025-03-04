<template>
    <el-dialog
        v-model="show"
        :title="title"
    >
        <el-form
            :model="formData"
            :rules="rules"
            label-width="auto"
            label-position="left"
            ref="form"
            class="form"
            @submit.prevent="submit"
        >
            <el-form-item
                label="Название раздела"
                class="form__item"
                prop="title"
            >
                <el-input
                    v-model="formData.title"
                    placeholder="Введите названия раздела"
                />
            </el-form-item>

            <el-form-item
                v-if="mode == 'createPartition'"
                label="Родительский раздел"
                class="form__item"
                prop="parent_id"
            >
                <el-tree-select
                    v-model="formData.parent_id"
                    :data="partitionsTree"
                    clearable
                    check-strictly
                    :render-after-expand="false"
                    :props="{ label: 'title', children: 'children', value: 'id' }"
                    placeholder="Введите ID родительского раздела (по умолчанию раздел корневой)"
                />

            </el-form-item>

            <el-button
                type="primary"
                @click="submit"
            >
                Сохранить данные
            </el-button>

        </el-form>

        <div
            v-if="mode == 'createSubPartition'"
            class="mt-3"
        > 
            Будет создан подраздел в разделе - <b>{{ notes }}</b>
        </div>

    </el-dialog>
</template>

<script setup>
import { reactive, ref } from 'vue';


import { usePartitionTree } from "@document-routes/partition/entities/partition";
import { useUser } from '@common/app/composables';

const { createPartition, editPartition } = usePartitionTree();

const show = defineModel('show', { default: false });

const props = defineProps({
    title: { type: String },
    data: { type: Object, default: {} },
    mode: { type: String, required: true },
    partitionsTree: { type: Array, default: [] }
});

const emit = defineEmits(['updateTree']);

const { user } = useUser();

const form = ref();

const notes = ref(null);

const formData = reactive({
    title: null,
    id: null,
    parent_id: null,
    is_active: true,
});

const rules = reactive({
    title: { required: true, message: 'Необходимо ввести название раздела' },
});

const submit = async () => {

    form.value.validate(async (isValid) => {

        if (!isValid) return;

        if (props.mode === 'createPartition')
            await createPartition({ parent_id: formData.parent_id, title: formData.title, user_id: user.id, is_active: formData.is_active });

        if (props.mode === 'createSubPartition')
            await createPartition({ parent_id: formData.parent_id, title: formData.title, user_id: user.id, is_active: formData.is_active });

        if (props.mode === 'editPartition')
            await editPartition({ id: formData.id, title: formData.title, user_id: user.id, is_active: formData.is_active });

        emit('updateTree');
    });
};

if (props.mode == 'createSubPartition') {
    const { parent_id, title } = props.data;
    formData.parent_id = parent_id;
    formData.title = null;
    notes.value = title;
};

if (props.mode == 'editPartition') {
    const { id, title } = props.data;
    formData.id = id;
    formData.title = title;
};

</script>