<template>
    <Preloader :loading="loading">
        <el-row>
            <el-col :md=12>
                <el-form
                    :model="formData"
                    :rules="rules"
                    label-width="auto"
                    label-position="left"
                    ref="form"
                    class="form"
                >
                    <el-form-item
                        label="Элемент"
                        class="form__item"
                    >
                        <b class="header_h3">Шаблон документа Поручение</b>
                    </el-form-item>

                    <el-form-item
                        label="Тема документа"
                        class="form__item"
                        prop="title"
                    >
                        <el-input
                            v-model="formData.title"
                            type="textarea"
                            :rows="2"
                            placeholder="Введите тему документа"
                        />
                    </el-form-item>

                    <el-form-item
                        label="Дни исполнения"
                        class="form__item"
                        prop="data.days_amount"
                    >
                        <el-input
                            v-model="formData.data.days_amount"
                            type="number"
                            placeholder="Введите количество дней"
                        />
                    </el-form-item>

                    <el-form-item
                        label="Родительский документ"
                        prop="partition_id"
                    >
                        <el-input
                            v-model="formData.parent.title"
                            readonly
                            @click="showParentModal = true"
                            :disabled="formData.is_start"
                        >
                            <template #append>
                                <el-button
                                    type="primary"
                                    icon="FolderOpened"
                                    class="select-partition-button"
                                    @click="showParentModal = true"
                                    :disabled="formData.is_start"
                                >
                                    Выбрать
                                </el-button>
                            </template>
                        </el-input>
                    </el-form-item>

                    <el-form-item
                        label="Содержание документа"
                        class="form__item"
                        prop="data.content"
                    >
                        <el-input
                            v-model="formData.data.content"
                            type="textarea"
                            :rows="3"
                            placeholder="Введите тему документа"
                        />
                    </el-form-item>

                    <el-form-item
                        label="Активность"
                        class="form__item"
                        prop="is_active"
                    >
                        <Switch v-model="formData.is_active" />
                    </el-form-item>

                    <el-form-item
                        label="Стартовый"
                        class="form__item"
                        prop="is_start"
                    >
                        <Switch
                            v-model="formData.is_start"
                            @change="handleChangeIsStart"
                        />
                    </el-form-item>

                    <h3 class="header_h3">Участники процесса</h3>

                    <el-form-item
                        label="Автор:"
                        class="form__item"
                        prop="data.author"
                    >
                        <SearchUserExtra v-model="formData.data.author" />
                    </el-form-item>

                    <el-form-item
                        label="Исполнитель:"
                        class="form__item"
                        prop="data.executors"
                    >
                        <SearchUserExtra
                            v-model="formData.data.executors"
                            multiple
                        />
                    </el-form-item>

                    <el-form-item
                        label="Контроллер:"
                        class="form__item"
                        prop="data.controllers"
                    >
                        <SearchUserExtra
                            v-model="formData.data.controllers"
                            multiple
                        />
                    </el-form-item>

                    <el-form-item
                        label="Наблюдатель:"
                        class="form__item"
                        prop="data.observers"
                    >
                        <SearchUserExtra
                            v-model="formData.data.observers"
                            multiple
                        />
                    </el-form-item>

                    <el-button
                        type="primary"
                        @click="submit"
                    >
                        Сохранить данные
                    </el-button>

                </el-form>
            </el-col>
        </el-row>

        <SelectParentModal
		    v-model:show="showParentModal"    
            :routeId="routeId"
            @change="handleChangeParent"
            v-model:current-parent-id="formData.parent_id"
    	/>

    </Preloader>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { notify } from '@common/shared/utils';
import { Preloader } from '@common/shared/ui';
import { DOCUMENT_TEMPLATE_TYPE } from '@document-routes/common/shared/constants';
import { SearchUserExtra, Switch } from "@common/shared/ui";
import { DocumentTemplateRepo } from '@document-routes/document-template/entities/document-template';
import { SelectParentModal } from "@document-routes/document-template/entities/document-template";

const props = defineProps({
    mode: String,
    routeId: {
        type: Number,
        required: true,
        default: null,
    },
    data: {
        type: Object,
        required: false,
        default: null,
    },
});

const loading = ref(false);
const form = ref();

const router = useRouter();

const showParentModal = ref(false);

const formData = reactive({
    id: null,
    title: null,
    parent: {
        id: null,
        title: null
    },
    parent_id: null,
    route_id: props.routeId,
    type_id: DOCUMENT_TEMPLATE_TYPE.DIRECTIVE,
    data: {
        content: null,
        daysAmount: null,
        author: null,
        executors: [],
        controllers: [],
        observers: [],
    },
    is_start: false,
    is_active: true,
});

const rules = reactive({
    title: { required: true, message: 'Необходимо ввести название темы' },
    partition_id: { required: false, message: 'Необходимо родительский документ' },
    'data.content': { required: true, message: 'Необходимо ввести содержание документа' },
    'data.days_amount': { required: true, message: 'Необходимо указать дни исполнения документа' },
    'data.author': { required: true, message: 'Необходимо выбрать автора' },
    'data.executors': { required: true, message: 'Необходимо выбрать исполнителя' },
    'data.controllers': { required: false, message: 'Необходимо выбрать контроллера' },
    'data.observers': { required: false, message: 'Необходимо выбрать наблюдателя' },
});

const submit = async () => {

    form.value.validate(async (isValid) => {
        if (!isValid) return;
        let result;

        try {
            loading.value = true;
            if (props.mode === 'create') {

                result = await DocumentTemplateRepo.create(formData);

            } else {

                result = await DocumentTemplateRepo.edit(formData);

            }

            router.push({ name: 'detailTemplatePage', params: { id: result.id } });

        } catch (e) {
            notify.fetchError(e.message);
            throw e;
        } finally {
            loading.value = false;
        }

    });
};

if (props.mode === 'edit') {
    const {
        id,
        title,
        parent_id,
        parent,
        data,
        is_start,
        is_active
    } = props.data;

    formData.id = id;
    formData.title = title;
    formData.parent_id = parent_id;
    formData.parent = {
		id: parent ? parent.id : null,
		title: parent ? parent.title : null,
	};
    formData.data.content = data.content;
    formData.data.days_amount = data.days_amount;    

    formData.data.author = data.author;
    formData.data.executors = data.executors ?? [];
    formData.data.controllers = data.controllers ?? [];
    formData.data.observers = data.observers ?? [];

    formData.is_start = is_start;
    formData.is_active = is_active;
};

const handleChangeParent = (parent) => {
	formData.parent = parent;
	formData.parent_id = parent.id;
	showParentModal.value = false;
};

const handleChangeIsStart = () => {
	formData.parent_id = null;
	formData.parent = {
		id: null,
		title: null,
	};
};

</script>

<style scoped lang="scss">
</style>
