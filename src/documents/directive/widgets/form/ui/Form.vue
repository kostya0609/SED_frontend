<template>
	<Preloader :loading="loading">
		<el-form
			:model="formData"
			:rules="rules"
			label-width="auto"
			label-position="left"
			ref="form"
			class="form"
		>
			<el-row :gutter="20">
				<el-col :md="12">
					<MainFields
						v-model:form-data="formData"
						:defaultValues="defaultValues"
					/>

				</el-col>
				<el-col :md="12">
					<Files
						v-model:form-data="formData"
						:defaultValues="defaultValues"
					/>
				</el-col>
			</el-row>

			<el-button
				type="primary"
				@click="submit"
			>
				Сохранить данные
			</el-button>

		</el-form>
	</Preloader>
</template>

<script setup>
import { reactive, ref, watch } from "vue";
import { useRouter } from 'vue-router';
import { Preloader } from "@common/shared/ui";
import MainFields from "./MainFields.vue";
import Files from "./Files.vue";
import { prepareFiles, formatDateTime, notify, getFormDataFileList } from '@common/shared/utils';
import { DirectiveRepo } from "@documents/directive/entities/directive/api/index.js";
import { createDocumentLink } from '@documents/common/entities/document';
import { useUser } from "@/common/app/composables";

const loading = ref(false);
const props = defineProps({
	mode: String,
	data: {
		type: Object,
		required: false,
		default: null,
	},
});

const router = useRouter();
const { user } = useUser();

const form = ref();

const rules = reactive({
	theme: { required: true, message: 'Необходимо ввести тему документа' },
	content: { required: true, message: 'Необходимо ввести содержание документа' },
	executed_at: { required: true, message: 'Необходимо указать срок исполнения' },
	creator: { required: true, message: 'Необходимо указать создателя' },
	author: { required: true, message: 'Необходимо указать автора' },
	executors: { required: true, message: 'Необходимо указать исполнителей' },
	main: { required: false, message: 'Необходимо прикрепить основные файлы' },
	portfolio: { required: false, message: 'Необходимо ввести описание портфеля документов' },
});

const formData = reactive({
	id: null,
	theme: null,
	content: null,
	portfolio: null,
	executed_at: null,
	creator: null,
	author: null,
	executors: [],
	controllers: [],
	observers: [],
	main: [],

});

const defaultValues = reactive({
	themes: [],
});

//TODO: сдлеать общее получение тем с бэка
defaultValues.themes = [
	{ id: 1, title: 'Тестовая тема' },
	{ id: 2, title: 'Тестовая тема 2' },
	{ id: 3, title: 'Тестовая тема 3' },
];

const submit = async () => {

	form.value.validate(async (isValid) => {
		if (!isValid) return;

		let document, dto, files, link;

		try {
			loading.value = true;
			dto = {
				document_id: formData.id,
				theme_id: formData.theme.id,
				executed_at: formData.executed_at,
				content: formData.content,
				portfolio: formData.portfolio,

				creator_id: formData.creator.id,
				author_id: formData.author.id,
				executors: formData.executors.map(el => el.id),
				controllers: formData.controllers.map(el => el.id),
				observers: formData.observers.map(el => el.id),
			};

			if (props.mode === 'create') {
				document = await DirectiveRepo.create(dto);
				if (formData.main.length > 0) {
					files = getFormDataFileList(document.id)
						.append(formData.main, 'main')
						.get();
					await DirectiveRepo.uploadFiles(files);
				}

			} else {
				document = await DirectiveRepo.update(dto);
				files = getFormDataFileList(document.id)
					.append(formData.main, 'main')
					.get();

				await DirectiveRepo.uploadFiles(files);
			}

			link = createDocumentLink(document.type_id, 'detail', document.id);
			router.push(link);

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
		theme,
		contents,
		executed_at,
		creator,
		author,
		executors,
		controllers,
		observers,

		main_files,
	} = props.data;

	formData.id = id;

	formData.theme = theme;

	formData.content = contents.content;
	formData.portfolio = contents.portfolio;

	formData.executed_at = formatDateTime(executed_at, {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
	});

	formData.creator = creator.user;
	formData.author = author.user;
	formData.executors = executors.map(el => el.user);
	formData.controllers = controllers.map(el => el.user);
	formData.observers = observers.map(el => el.user);

	formData.main = prepareFiles(main_files ? main_files.map(el => el.file) : []);

} else formData.creator = user;


watch([() => formData.main.length], () => {
	form.value.validateField(['main'], () => null);
})
</script>
