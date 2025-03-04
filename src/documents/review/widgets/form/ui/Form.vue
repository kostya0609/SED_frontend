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
import MainFields from "./MainFields.vue";
import { Preloader } from "@common/shared/ui";
import { useRouter, useRoute } from 'vue-router';
import { useUser } from "@/common/app/composables";
import { reactive, ref, watch, onUnmounted } from "vue";
import { createDocumentLink } from '@documents/common/entities/document';
import { ReviewRepo } from "@documents/review/entities/review/api/index.js";
import { DOCUMENT_STATUS } from "@documents/review/entities/review/constants";
import { prepareFiles, notify, getFormDataFileList } from '@common/shared/utils';
import { useDocument } from "@/documents/review/entities/review";

const loading = ref(false);

const props = defineProps({
	mode: String,
	data: {
		type: Object,
		required: false,
		default: null,
	},
});

const { document } = useDocument();
const router = useRouter();
const route = useRoute();
const { user } = useUser();

const form = ref();

const rules = reactive({
	content: { required: true, message: 'Необходимо ввести содержание документа' },
	initiator: { required: true, message: 'Необходимо указать инициатора' },
	receivers: { required: true, message: 'Необходимо указать получающих' },

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
	initiator: null,
	receivers: [],

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
				theme_id: formData.theme.id,
				content: formData.content,
				portfolio: formData.portfolio,
				receivers: formData.receivers,
				theme_title: formData.theme.theme_title,
				tmp_doc_id: formData.theme.tmp_doc_id,
			};

			if (props.mode === 'create') {
				dto.parent_document_id = +route.params.parent_id || null;

				_document = await ReviewRepo.preCreate(dto);
				if (formData.main.length > 0) {
					files = getFormDataFileList(_document.id)
						.append(formData.main, 'main')
						.get();
					await ReviewRepo.uploadFiles(files);
				}

				broadcastChannel.postMessage('Документ создан');

			} else {
				_document = await ReviewRepo.update(dto);
				files = getFormDataFileList(_document.id)
					.append(formData.main, 'main')
					.get();

				await ReviewRepo.uploadFiles(files);
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
		initiator,
		receivers,

		main_files,
		theme,
	} = props.data;

	formData.id = id;

	formData.content = contents.content;
	formData.portfolio = contents.portfolio;

	formData.initiator = initiator.user;

	formData.receivers = receivers;

	formData.main = prepareFiles(main_files ? main_files.map(el => el.file) : []);

	formData.theme.theme_title = theme;
	formData.theme.tmp_doc_id = null;

} else {
	formData.initiator = user;
}

watch([() => formData.main.length,], () => {
	form.value.validateField(['main',], () => null);
})

watch([() => formData.receivers], () => {
	form.value && form.value.validateField(['receivers'], () => null);
}, { deep: true });

onUnmounted(() => {
	broadcastChannel.close();
});
</script>
