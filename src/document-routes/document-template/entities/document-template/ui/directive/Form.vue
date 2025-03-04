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
						<div class="header_h3">Шаблон документа Поручение</div>
					</el-form-item>

					<el-form-item
						label="Тема документа"
						class="form__item"
						prop="title"
					>
						<el-input
							v-model="formData.title"
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
						label="Родительские документы"
						prop="parents"
					>
						<SelectParentTemplate
							v-model="parentObjects"
							v-model:result="formData.parents"
							:disabled="formData.is_start"
							:route-id="routeId"
							:template-id="formData.id"
						/>
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
						<UserSearchV2
							class="flex-1"
							v-model="formData.data.author"
							deletion
							selectRoles
						/>
					</el-form-item>

					<el-form-item
						label="Исполнитель:"
						class="form__item"
						prop="data.executors"
					>
						<UserSearchV2
							class="flex-1"
							multiple
							v-model="formData.data.executors"
							deletion
							selectRoles
						/>
					</el-form-item>

					<el-form-item
						label="Контроллер:"
						class="form__item"
						prop="data.controllers"
					>
						<UserSearchV2
							class="flex-1"
							multiple
							v-model="formData.data.controllers"
							deletion
							selectRoles
						/>
					</el-form-item>

					<el-form-item
						label="Наблюдатель:"
						class="form__item"
						prop="data.observers"
					>
						<UserSearchV2
							class="flex-1"
							multiple
							v-model="formData.data.observers"
							deletion
							selectRoles
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
	</Preloader>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref, reactive, watch } from 'vue';
import { notify } from '@common/shared/utils';
import { Preloader, Switch, UserSearchV2 } from "@common/shared/ui";
import { DOCUMENT_TEMPLATE_TYPE } from '@document-routes/common/shared/constants';
import { SelectParentTemplate } from "@document-routes/document-template/entities/document-template";
import { DocumentTemplateRepo } from '@document-routes/document-template/entities/document-template';

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
const parentObjects = ref([]);

const router = useRouter();

const formData = reactive({
	id: null,
	title: null,
	route_id: props.routeId,
	type_id: DOCUMENT_TEMPLATE_TYPE.DIRECTIVE,
	parents: [],
	data: {
		content: null,
		days_amount: null,
		author: null,
		executors: [],
		controllers: [],
		observers: [],
	},
	is_start: false,
	is_active: true,
});

const handleChangeIsStart = () => {
	formData.parents = [];
};

const checkParents = (rule, value, callback) => {
	if (!formData.is_start && !value.length) {
		return callback(new Error('Необходимо указать родительские документы или сделать шаблон стартовым!'));
	} else {
		callback();
	}
};

const rules = reactive({
	title: { required: true, message: 'Необходимо ввести название темы' },
	parents: [{ validator: checkParents, trigger: 'blur' }],
	'data.content': { required: true, message: 'Необходимо ввести содержание документа' },
	'data.days_amount': { required: false, message: 'Необходимо указать дни исполнения документа' },
	'data.author': { required: false, message: 'Необходимо выбрать автора' },
	'data.executors': { required: false, message: 'Необходимо выбрать исполнителя' },
	'data.controllers': { required: false, message: 'Необходимо выбрать контроллера' },
	'data.observers': { required: false, message: 'Необходимо выбрать наблюдателя' },
});

const submit = async () => {
	form.value.validate(async (isValid) => {
		try {
			if (!isValid) return;

			let result;

			loading.value = true;

			if (props.mode === 'create') {
				result = await DocumentTemplateRepo.create(formData);
			} else {
				result = await DocumentTemplateRepo.edit(formData);
			}

			//router.push({ name: 'detailTemplatePage', params: { id: result.id } });
			router.back(1);
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
		parents,
		data,
		is_start,
		is_active
	} = props.data;

	formData.id = id;
	formData.title = title;
	parentObjects.value = parents;
	formData.data.content = data.content;
	formData.data.days_amount = data.days_amount;

	formData.data.author = data.author;
	formData.data.executors = data.executors ?? [];
	formData.data.controllers = data.controllers ?? [];
	formData.data.observers = data.observers ?? [];

	formData.is_start = is_start;
	formData.is_active = is_active;
};

watch([() => formData.is_start], () => {
	form.value.validateField(['parents']);
});
</script>

<style scoped lang="scss">
.select-partition-button {
	border-radius: 0 5px 5px 0;
	display: inline-flex;
}
</style>
