<template>

  <el-form-item
    label="Элемент"
    class="form__item"
  >
    <b class="header_h3">Ознакомление</b>
  </el-form-item>

  <el-form-item
    label="Тема документа"
    class="form__item"
    prop="theme"
  >
    <SearchTheme
      v-model="formData.theme"
      :options="defaultValues.themes"
    />
  </el-form-item>

  <el-form-item
    label="Содержание документа"
    class="form__item"
    prop="content"
  >
    <el-input
      v-model="formData.content"
      type="textarea"
      :rows="5"
      placeholder="Содержание документа"
    />
  </el-form-item>

  <h3 class="header_h3">Участники процесса</h3>

  <el-form-item
    label="Инициатор:"
    class="form__item"
    prop="responsible"
  >
    <SearchUser
      v-model="formData.responsible"
      :options="defaultValues.responsible"
      disabled
    />
  </el-form-item>


  <el-form-item
    label="Получающие ознакомление:"
    class="form__item"
    prop="receivers"
  >
    <SearchUser
      v-model="formData.receivers"
      :options="defaultValues.receivers"
      multiple
    />
  </el-form-item>

</template>

<script setup>

import { SearchUser, SearchTheme } from "@common/shared/ui";

defineProps({
  formData: Object,
  defaultValues: Object,
});

</script>

<style scoped lang="scss">
.form {
  &__item {}
}
</style>