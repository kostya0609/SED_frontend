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
						:mode="mode"
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
import { reactive, ref, watch, onUnmounted } from "vue";
import { useRouter, useRoute } from 'vue-router';
import { Preloader } from "@common/shared/ui";
import MainFields from "./MainFields.vue";
import { prepareFiles, formatDateTime, notify, getFormDataFileList } from '@common/shared/utils';
import { DirectiveRepo } from "@documents/directive/entities/directive/api/index.js";
import { createDocumentLink } from '@documents/common/entities/document';
import { useUser } from "@/common/app/composables";
import { DOCUMENT_STATUS } from "@documents/directive/entities/directive/constants";
import { useDocument } from "@/documents/directive/entities/directive";

const { document } = useDocument();

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
const route = useRoute();
const { user } = useUser();

const form = ref();

const rules = reactive({
	content: { required: true, message: 'Необходимо ввести содержание документа' },
	executed_at: { required: true, message: 'Необходимо указать срок исполнения' },
	creator: { required: true, message: 'Необходимо указать создателя' },
	author: { required: true, message: 'Необходимо указать автора' },
	executors: { required: true, message: 'Необходимо указать исполнителей' },
	main: { required: false, message: 'Необходимо прикрепить основные файлы' },
	portfolio: { required: false, message: 'Необходимо ввести описание портфеля документов' },
	theme: {
		validator: (rule, value, callback) => {
			if (!value.theme_title && !value.tmp_doc_id) {
				return callback(new Error('Необходимо указать тему'));
			}

			callback();
		},
	},
});

const formData = reactive({
	id: null,
	status_id: DOCUMENT_STATUS.PREPARATION,
	content: null,
	portfolio: null,
	executed_at: null,
	creator: null,
	author: null,
	executors: [],
	controllers: [],
	observers: [],
	main: [],

	theme: {
		theme_title: '',
		tmp_doc_id: null,
	}

});

const broadcastChannel = new BroadcastChannel('creation-based');

const submit = async () => {

	form.value.validate(async (isValid) => {
		if (!isValid) return;

		let _document, dto, files, link;

		try {
			loading.value = true;

			dto = {
				document_id: formData.id,
				executed_at: formData.executed_at,
				content: formData.content,
				portfolio: formData.portfolio,

				creator_id: formData.creator.id,
				author: formData.author,
				executors: formData.executors,
				controllers: formData.controllers,
				observers: formData.observers,
				theme_title: formData.theme.theme_title,
				tmp_doc_id: formData.theme.tmp_doc_id,
			};

			if (props.mode === 'create') {

				dto.parent_document_id = +route.params.parent_id || null;

				_document = await DirectiveRepo.preCreate(dto);
				if (formData.main.length > 0) {
					files = getFormDataFileList(_document.id)
						.append(formData.main, 'main')
						.get();
					await DirectiveRepo.uploadFiles(files);
				}

				broadcastChannel.postMessage('Документ создан');

			} else {
				_document = await DirectiveRepo.update(dto);
				files = getFormDataFileList(_document.id)
					.append(formData.main, 'main')
					.get();

				await DirectiveRepo.uploadFiles(files);
			}

			/**
			  * Обновляем документ и переходим в деталку после редактирования.
			  * Если маршрут указывал на деталку (только при редактировании черновика), то router.push не сработает,
			  * а компонент страницы редактирования поменяется на деталку по условию.
			  */

			document.value = _document;

			link = createDocumentLink(_document.type_id, 'detail', _document.id);
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
		contents,
		executed_at,
		creator,
		author,
		executors,
		controllers,
		observers,

		main_files,
		theme,
	} = props.data;

	formData.id = id;

	formData.content = contents.content;
	formData.portfolio = contents.portfolio;

	formData.executed_at = formatDateTime(executed_at, {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
	});

	formData.creator = creator.user;
	formData.author = author;
	formData.executors = executors;
	formData.controllers = controllers;
	formData.observers = observers;

	formData.main = prepareFiles(main_files ? main_files.map(el => el.file) : []);

	formData.theme.theme_title = theme;
	formData.theme.tmp_doc_id = null;

} else {
	formData.creator = user;
}

watch([() => formData.main.length], () => {
	form.value.validateField(['main'], () => null);
})

watch([() => formData.author], () => {
	form.value && form.value.validateField(['author'], () => null);
}, { deep: true });

watch([() => formData.executors], () => {
	form.value && form.value.validateField(['executors'], () => null);
}, { deep: true });

onUnmounted(() => {
	broadcastChannel.close();
});
</script>
