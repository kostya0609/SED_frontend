<template>
  <el-upload
    ref="upload"
    :class="classNames"
    :auto-upload="autoUpload"
    drag
    @error="handleError"
    @exceed="handleExceed"
  >
    <el-icon class="el-icon--upload">
      <upload-filled />
    </el-icon>
    <div class="el-upload__text">
      Перенесите файлы в эту область или нажмите на иконку <em>загрузки</em>
    </div>

    <template #file="{ file }">
      <slot
        name="file"
        :file="file"
      />
    </template>
  </el-upload>
</template>
<script setup>
import { genFileId } from 'element-plus';
import { ref, defineExpose, computed } from 'vue';
import { UploadFilled } from '@element-plus/icons-vue';
import { notify } from '@/plugins/process/utils';

const props = defineProps({
  autoUpload: {
    type: Boolean,
    default: false,
  },
  block: {
    type: Boolean,
    default: false,
  }
});

const upload = ref();
const classNames = computed(() => ({
  'upload': true,
  'upload--block': props.block,
}));

const handleError = (error) => {
  notify.error('Ошибка загрузки файла!', error);
};

const handleExceed = (files) => {
  upload.value.clearFiles();
  const file = files[0];
  file.uid = genFileId();
  upload.value.handleStart(file);

  props.autoUpload && upload.value.submit();
};

defineExpose({
  ref: upload,
});
</script>
<style scoped lang="scss">
.upload {
  &--block {
    width: 100%;
  }
}
</style>