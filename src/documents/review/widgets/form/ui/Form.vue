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
import { prepareFiles, notify, getFormDataFileList  } from '@common/shared/utils';
import { ReviewRepo } from "@documents/review/entities/review/api/index.js";
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
  initiator: { required: true, message: 'Необходимо указать инициатора' },
  receivers: { required: true, message: 'Необходимо указать получающих' },

  main: { required: false, message: 'Необходимо прикрепить основные файлы' },
  portfolio: { required: false, message: 'Необходимо ввести описание портфеля документов' },
});

const formData = reactive({
  id: null,
  theme: null,
  content: '',
  portfolio: '',
  initiator: null,
  receivers: [],

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
        content: formData.content,
        portfolio: formData.portfolio,
        receivers: formData.receivers.map(el => el.id),
      };

      if (props.mode === 'create') {
        document = await ReviewRepo.create(dto);
        if (formData.main.length > 0) {
          files = getFormDataFileList(document.id)
            .append(formData.main, 'main')
            .get();
          await ReviewRepo.uploadFiles(files);
        }

      } else {
        document = await ReviewRepo.update(dto);
        files = getFormDataFileList(document.id)
          .append(formData.main, 'main')
          .get();

        await ReviewRepo.uploadFiles(files);
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
    initiator,
    receivers,

    main_files,
  } = props.data;

  formData.id = id;

  formData.theme = theme;

  formData.content = contents.content;
  formData.portfolio = contents.portfolio;

  formData.initiator = initiator.user;
  formData.receivers = receivers.map(el => el.user);

  formData.main = prepareFiles(main_files ? main_files.map(el => el.file) : []);

} else formData.initiator = user;


watch([() => formData.main.length,], () => {
  form.value.validateField(['main',], () => null);
})
</script>
