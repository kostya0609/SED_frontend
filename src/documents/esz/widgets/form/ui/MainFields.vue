<template>

  <el-form-item
    label="Элемент"
    class="form__item"
  >
    <b class="header_h3">ЭСЗ</b>
  </el-form-item>

  <el-form-item
    label="Тема документа"
    class="form__item"
    prop="subject"
  >
    <div class="form__sub-item">
      <el-input
        v-model="formData.subject"
        placeholder="Тема документа"
        class="form__input"
      />
      <el-button type="primary">
        Выбрать
      </el-button>
    </div>
  </el-form-item>

  <el-form-item
    label="Содержание документа"
    class="form__item"
    prop="contents"
  >
    <el-input
      v-model="formData.contents"
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
    />
  </el-form-item>

  <el-form-item
    label="Подписант:"
    class="form__item"
    prop="signatory"
  >
    <SearchUser
      v-model="formData.signatory"
      :options="defaultValues.signatory"
    />
  </el-form-item>

  <el-form-item
    label="Адресаты:"
    class="form__item"
    prop="receivers"
  >
    <SearchUser
      v-model="formData.receivers"
      :options="defaultValues.receivers"
      multiple
    />
  </el-form-item>

  <el-form-item
    label="Наблюдатели:"
    class="form__item"
  >
    <SearchUser
      v-model="formData.lookers"
      :options="defaultValues.lookers"
      multiple
    />
  </el-form-item>

</template>

<script setup>

import { SearchUser } from "@common/shared/ui";

defineProps({
  formData: Object,
  defaultValues: Object,
});

</script>

<style scoped lang="scss">
.form {
  &__item {}

  &__sub-item {
    flex: 1;
    display: flex;
    gap: 5px;
    flex-wrap: wrap;
  }

  &__select {}

  &__input {
    flex: 1 1 300px;
  }
}
</style>