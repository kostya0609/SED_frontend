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
						<div class="header_h3">Шаблон документа Ознакомление</div>
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
						label="Получающие ознакомление:"
						class="form__item"
						prop="data.receivers"
					>
						<UserSearchV2
							v-model="formData.data.receivers"
							multiple
							deletion
							selectRoles
							class="flex-1"
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
import { ref, reactive, watch } from 'vue';
import { useRouter } from 'vue-router';
import { notify } from '@common/shared/utils';
import { DOCUMENT_TEMPLATE_TYPE } from '@document-routes/common/shared/constants';
import { Switch, Preloader, UserSearchV2 } from "@common/shared/ui";
import { DocumentTemplateRepo } from '@document-routes/document-template/entities/document-template';
import { SelectParentTemplate } from "@document-routes/document-template/entities/document-template";

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
	parents: [],
	route_id: props.routeId,
	type_id: DOCUMENT_TEMPLATE_TYPE.REVIEW,
	data: {
		content: null,
		receivers: [],
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
	'data.receivers': { required: false, message: 'Необходимо выбрать получающих ознакомление' },
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
	formData.data.receivers = data.receivers ?? [];
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
