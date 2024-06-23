<template>
  <h3 class="header_h3">Основные файлы</h3>
  <el-form-item
    class="form__item"
    props="main"
  >
    <UploadFile v-model:file-list="formData.main" />
  </el-form-item>

  <h3 class="header_h3">Описание портфеля документов</h3>
  <el-form-item
    class="form__item"
    props="portfolio"
  >
    <el-input
      v-model="formData.portfolio"
      type="textarea"
      :rows="6"
      placeholder="Описание портфеля документов"
      class="form__input"
    />
  </el-form-item>
</template>

<script setup>
import { UploadFile } from '@common/shared/ui';

defineProps({
  formData: Object,
  defaultValues: Object,
});

</script>

<style scoped lang="scss">
.form {
  &__item {}

  &__item.is-error ::v-deep(.el-upload-dragger) {
    border-color: red;
    border-style: solid;
  }

  &__input {}
}
</style>
