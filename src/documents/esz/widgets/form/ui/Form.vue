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
import { Preloader } from "@common/shared/ui";
import MainFields from "./MainFields.vue";
import Files from "./Files.vue";
import { prepareFiles } from '@common/shared/utils';

const loading = ref(false);
const props = defineProps({
  mode: String,
  data: {
    type: Object,
    required: false,
    default: null,
  },
});

const form = ref();

const rules = reactive({
  subject: { required: true, message: 'Необходимо ввести тему документа' },
  contents: { required: true, message: 'Необходимо ввести содержание документа' },
  responsible: { required: true, message: 'Необходимо указать инициатора' },
  signatory: { required: true, message: 'Необходимо указать подписанта' },
  receivers: { required: true, message: 'Необходимо указать адресатов' },

  main: { required: false, message: 'Необходимо прикрепить основные файлы' },
  additional: { required: false, message: 'Необходимо прикрепить дополнительные файлы' },
  description_files: { required: false, message: 'Необходимо ввести описание портфеля документов' },
});

const formData = reactive({
  id: null,
  subject: null,
  contents: null,
  responsible: null,
  signatory: null,
  receivers: [],
  lookers: [],

  main: [],
  additional: [],
  description_files: '',
});

const defaultValues = reactive({
  responsible: [],
  signatory: [],
  receivers: [],
  lookers: [],
});

const submit = async () => {

  form.value.validate(async (isValid) => {
    if (!isValid) return;
    console.log('проверка валидности прошла успешно', formData)
  });

  //$router.push('/documents/esz/detail/1');
};

if (props.mode === 'edit') {

  const {
    id,
    subject,
    contents,
    responsible,
    signatory,
    receivers,
    lookers,

    description_files,
    main_files,
    additional_files,
  } = props.data;

  formData.id = id;

  formData.subject = subject;

  formData.contents = contents;

  formData.responsible = responsible;
  defaultValues.responsible[0] = responsible;

  formData.signatory = signatory;
  defaultValues.signatory[0] = signatory;

  formData.receivers = receivers;
  defaultValues.receivers = receivers;

  formData.lookers = lookers;
  defaultValues.lookers = lookers;

  formData.description_files = description_files;

  formData.main = prepareFiles(main_files);

  formData.additional = prepareFiles(additional_files);
};

watch([() => formData.main.length, () => formData.additional.length], () => {
  form.value.validateField(['main', 'additional'], () => null);
})
</script>
