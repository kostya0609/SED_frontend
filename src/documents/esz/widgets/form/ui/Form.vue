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
			<!-- Расширенная форма редактирования ЭСЗ с возможностью настраивать участников бизнес-процесса -->
			<el-row :gutter="20">
				<el-col :md="12">
					<MainFields
						v-model:form-data="formData"
						:mode="mode"
					/>
				</el-col>
				<el-col
					:md="12"
					v-if="slots.process"
				>
					<slot name="process" />
				</el-col>
			</el-row>

			<el-button
				type="primary"
				@click="saveAndAddParticipants"
				v-if="mode === 'create'"
			>
				Сохранить и добавить участников согласования
			</el-button>

			<el-button
				type="primary"
				@click="save"
				v-else
			>
				Сохранить данные
			</el-button>
		</el-form>
	</Preloader>
</template>

<script setup>
import { onUnmounted, reactive, ref, useSlots, watch } from "vue";
import { useRouter, useRoute } from 'vue-router';
import { Preloader } from "@common/shared/ui";
import MainFields from "./MainFields.vue";
import { prepareFiles, notify, getFormDataFileList } from '@common/shared/utils';
import { ESZRepo } from "@documents/esz/entities/esz/api/index.js";
import { createDocumentLink } from '@documents/common/entities/document';
import { useUser } from "@/common/app/composables";
import { DOCUMENT_STATUS } from "@documents/esz/entities/esz/constants";
import { useDocument } from "@/documents/esz/entities/esz";

const slots = useSlots();
const { document } = useDocument();

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

const loading = ref(false);
const form = ref();

const rules = reactive({
	content: {
		required: true,
		message: 'Необходимо ввести содержание документа',
	},
	initiator: {
		required: true,
		message: 'Необходимо указать инициатора',
	},
	signatory: {
		required: true,
		message: 'Необходимо указать подписанта',
	},
	receivers: {
		required: true,
		message: 'Необходимо указать адресатов',
	},

	main: {
		required: false,
		message: 'Необходимо прикрепить основные файлы',
	},
	portfolio: {
		required: false,
		message: 'Необходимо ввести описание портфеля документов',
	},

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
	initiator: null,
	signatory: null,
	receivers: [],
	observers: [],

	main: [],
	additional: [],
	portfolio: '',

	theme: {
		theme_title: '',
		tmp_doc_id: null,
	}
});

const broadcastChannel = new BroadcastChannel('creation-based');

const submit = async (callback) => {
	form.value.validate(async (isValid) => {
		if (!isValid) return;

		let _document, dto, files;

		try {
			loading.value = true;

			if (props.mode === 'create') {
				dto = {
					document_id: formData.id,
					content: formData.content,
					portfolio: formData.portfolio,
					signatory: formData.signatory,
					receivers: formData.receivers,
					observers: formData.observers,
					theme_title: formData.theme.theme_title,
					tmp_doc_id: formData.theme.tmp_doc_id,
				};

				dto.parent_document_id = +route.params.parent_id || null;

				_document = await ESZRepo.preCreate(dto);
				if (formData.main.length > 0 || formData.additional.length > 0) {
					files = getFormDataFileList(_document.id)
						.append(formData.main, 'main')
						.append(formData.additional, 'additional')
						.get();
					await ESZRepo.uploadFiles(files);
				}

				broadcastChannel.postMessage('Документ создан');

			} else {
				dto = {
					document_id: formData.id,
					content: formData.content,
					portfolio: formData.portfolio,
					signatory: formData.signatory,
					receivers: formData.receivers,
					observers: formData.observers,
					theme_title: formData.theme.theme_title,
					tmp_doc_id: formData.theme.tmp_doc_id,
				};

				_document = await ESZRepo.update(dto);
				files = getFormDataFileList(_document.id)
					.append(formData.main, 'main')
					.append(formData.additional, 'additional')
					.get();
				await ESZRepo.uploadFiles(files);
			}

			callback(_document);
		} catch (e) {
			notify.fetchError(e.message);
			throw e;
		} finally {
			loading.value = false;
		}
	});
};

const save = async () => {
	await submit(_document => {

		/**
		 * Обновляем документ и переходим в деталку после редактирования.
		 * Если маршрут указывал на деталку (только при редактировании черновика), то router.push не сработает,
		 * а компонент страницы редактирования поменяется на деталку по условию.
		 */

		document.value = _document;
		router.push(createDocumentLink(_document.type_id, 'detail', _document.id));		
	});
};

const saveAndAddParticipants = async () => {
	await submit(document => {
		router.push(createDocumentLink(document.type_id, 'edit', document.id));
	});
};

if (props.mode === 'edit') {

	const {
		id,
		contents,
		initiator,
		signatory,
		receivers,
		observers,
		status_id,

		main_files,
		additional_files,
		theme,
	} = props.data;

	formData.id = id;
	formData.status_id = status_id;
	formData.content = contents.content;
	formData.portfolio = contents.portfolio;

	formData.initiator = initiator.user;
	formData.signatory = signatory;
	formData.receivers = receivers;
	formData.observers = observers;

	formData.main = prepareFiles(main_files ? main_files.map(el => el.file) : []);
	formData.additional = prepareFiles(additional_files ? additional_files.map(el => el.file) : []);

	formData.theme.theme_title = theme;
	formData.theme.tmp_doc_id = null;

} else {
	formData.initiator = user;
};

watch([() => formData.main.length], () => {
	form.value.validateField(['main'], () => null);
});

watch([() => formData.additional.length], () => {
	form.value.validateField(['additional'], () => null);
});

watch([() => formData.signatory], () => {
	form.value && form.value.validateField(['signatory'], () => null);
}, { deep: true });

watch([() => formData.receivers], () => {
	form.value && form.value.validateField(['receivers'], () => null);
}, { deep: true });

onUnmounted(() => {
	broadcastChannel.close();
});
</script>
