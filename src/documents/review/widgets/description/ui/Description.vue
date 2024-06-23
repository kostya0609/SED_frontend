<template>
  <div class="Review-description-tab">
    <el-table
      :data="table_data"
      class="Review-description-tab__table"
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

            <el-link
              v-if="item.original_name"
              :underline="false"
              :href="getDownLoadLink(item.id)"
              download
            >
              {{ item.original_name }}
            </el-link>

            <span
              v-if="typeof item === 'string'"
              v-html="item"
            >
            </span>

          </div>


          <div v-else>
            <UserLink
              v-if="row.value.full_name"
              :user="row.value"
            />

            <span v-if="typeof row.value === 'string'">
              {{ row.value }}
            </span>

          </div>

        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>

import { ref, watchEffect } from "vue";
import { formatDateTime, getDownLoadLink } from "@common/shared/utils"
import { UserLink } from "@common/shared/ui"

const props = defineProps({
  document: Object,
});

const table_data = ref([]);

const downloadFile = async (id) => {
  console.log('id = ', id);
};

watchEffect(() => {
  table_data.value = [];
  table_data.value.push({ name: 'Номер документа:', value: props.document.number ?? 'нет данных' });
  table_data.value.push({ name: 'Тип документа:', value: props.document.type.title ?? 'нет данных' });
  table_data.value.push({ name: 'Статус:', value: props.document.status.title ?? 'нет данных' });
  table_data.value.push({ name: 'Тема документа:', value: props.document.theme.title ?? 'нет данных' });
  table_data.value.push({ name: 'Дата создания:', value: formatDateTime(props.document.created_at) ?? 'нет данных' });
  table_data.value.push({ name: 'Документ основание:', value: props.document.parent ?? 'нет данных' });
  table_data.value.push({ name: 'Содержание документа:', value: props.document.contents.content ?? 'нет данных' });
  table_data.value.push({
    name: 'Описание портфеля документов:',
    value: props.document.contents.portfolio ?? 'нет данных'
  });

  table_data.value.push({ name: 'Инициатор:', value: props.document.responsible ? props.document.responsible.user : 'нет данных' });
  table_data.value.push({ name: 'Ознакомляющиеся:', value: props.document.receivers.length > 0 ? props.document.receivers.map(el => el.user) : 'нет данных' });
  table_data.value.push({
    name: 'Основные файлы',
    value: props.document.main_files ? props.document.main_files.map(el => el.file) : 'нет данных'
  });
})

</script>

<style scoped lang="scss">
.Review-description-tab {
  &__table {
    width: 100%;

    &::v-deep(.role-table_col:last-child) {
      margin-bottom: 0px !important;
    }
  }
}
</style>