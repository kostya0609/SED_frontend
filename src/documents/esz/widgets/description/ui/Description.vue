<template>
  <div class="ESZ-description-tab">
    <el-table
      :data="table_data"
      class="ESZ-description-tab__table"
      border
      stripe
      scrollbar-always-on
      :show-header="false"
    >
      <el-table-column
        prop="name"
        width="300"
      />
      <el-table-column>
        <template #default="{ row }">
          <div
            v-if="Array.isArray(row.value)"
            v-for="item in row.value"
            class="role-table_col mb-3"
          >
            <UserLink
              v-if="item.full_name"
              :user="item"
            />
            <span
              v-html="item"
              v-else
            />
          </div>

          <div v-else>
            <UserLink
              v-if="row.value.full_name"
              :user="row.value"
            />
            <span
              v-else
              v-html="row.value"
            />
          </div>

        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>

import { ref, watchEffect } from "vue";
import { formatDateTime } from "@common/shared/utils"
import { UserLink } from "@common/shared/ui"

const props = defineProps({
  document: Object,
});

const table_data = ref([]);

watchEffect(() => {
  table_data.value = [];
  table_data.value.push({ name: 'Номер документа:', value: props.document.number ?? 'нет данных' });
  table_data.value.push({ name: 'Тип документа:', value: props.document.type.title ?? 'нет данных' });
  table_data.value.push({ name: 'Статус:', value: props.document.status.title ?? 'нет данных' });
  table_data.value.push({ name: 'Тема документа:', value: props.document.subject ?? 'нет данных' });
  table_data.value.push({ name: 'Дата создания:', value: formatDateTime(props.document.date_created) ?? 'нет данных' });
  table_data.value.push({ name: 'Срок исполнения:', value: formatDateTime(props.document.date_execution) ?? 'нет данных' });
  table_data.value.push({ name: 'Документ основание:', value: props.document.foundation_document ?? 'нет данных' });
  table_data.value.push({ name: 'Содержание документа:', value: props.document.contents ?? 'нет данных' });
  table_data.value.push({
    name: 'Описание портфеля документов:',
    value: props.document.documents_description ?? 'нет данных'
  });

  table_data.value.push({ name: 'Инициатор:', value: props.document.responsible ?? 'нет данных' });
  table_data.value.push({ name: 'Подписант:', value: props.document.signatory ?? 'нет данных' });
  table_data.value.push({ name: 'Адресат:', value: props.document.receivers ?? 'нет данных' });
  table_data.value.push({ name: 'Наблюдатели:', value: props.document.lookers ?? 'нет данных' });
  table_data.value.push({
    name: 'Основные файлы',
    value: props.document.main_files.map(file => file.original_name) ?? 'нет данных'
  });
  table_data.value.push({
    name: 'Дополнительные файлы',
    value: props.document.additional_files.map(file => file.original_name) ?? 'нет данных'
  });
})

</script>

<style
  scoped
  lang="scss"
>
.ESZ-description-tab {
  &__table {
    width: 100%;

    &::v-deep(.role-table_col:last-child) {
      margin-bottom: 0px !important;
    }
  }
}
</style>