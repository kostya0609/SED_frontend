<template>
    <el-dialog
        v-model="show"
        :title="(mode == 'create' ? 'Cоздание ' : 'Редактирование ' ) + (!parent_id ? 'раздела в корне' : 'подраздела')" 
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
                label="Активность раздела"
                class="form__item"
                prop="is_active"
            >
                <Switch v-model="formData.is_active" />
            </el-form-item>

            <el-button
                type="primary"
                @click="submit"
            >
                Сохранить данные
            </el-button>

        </el-form>     

    </el-dialog>
</template>

<script setup>
import { reactive, ref } from 'vue';

import { usePartitionTree } from "@document-routes/partition/entities/partition";
import { useUser } from '@common/app/composables';
import { Switch } from '@common/shared/ui';
import { useRoute } from 'vue-router';

const { createPartition, editPartition, initPartitionsTree } = usePartitionTree();

const show = defineModel('show', { default: false });

const props = defineProps({
    data: { type: Object, default: {} },
    mode: { type: String, required: true },
});

const emit = defineEmits(['update']);

const route = useRoute();

const { user } = useUser();

const form = ref();

const parent_id = ref(route.params.partition_id);

const formData = reactive({
    title: null,
    id: null,
    is_active: true,
});

const rules = reactive({
    title: { required: true, message: 'Необходимо ввести название раздела' },
});

const submit = async () => {

    form.value.validate(async (isValid) => {

        if (!isValid) return;

        if (props.mode === 'create')
            await createPartition({ parent_id: parent_id.value, title: formData.title, user_id: user.id, is_active: formData.is_active });

        if (props.mode === 'edit')
            await editPartition({ id: formData.id, title: formData.title, user_id: user.id, is_active: formData.is_active });

        emit('update');
        show.value = false;
    });

};

if (props.mode == 'edit') {
    const { id, title, is_active } = props.data;
    formData.id = id;
    formData.title = title;
    formData.is_active = is_active;
};

</script>