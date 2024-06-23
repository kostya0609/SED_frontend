<template>
  <Preloader :loading="loading">
    <Grid
      :name="gridName"
      @gridReady="updateGrid(gridName)"
      @eventContext="eventContext"
    />
                   <!-- <el-button @click="sendDefaultFilterData">
                     Загрузить дефолтовый фильтр
                   </el-button> -->
    <el-link
      href="/knowledge/instrukcii/rabotasfmdogovory/ "
      target="_blank"
      type="danger"
    >
      Актуальная инструкция по работе с СЭД
    </el-link>
  </Preloader>
  
</template>

<script setup>
import { computed, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessageBox } from 'element-plus';
import { useUser } from '@/common/app/composables';

import { Grid, useGrids } from '@/plugins/vdg3';

import { notify } from "@common/shared/utils";
import { Preloader } from "@common/shared/ui";
import { DocumentRepo } from "@documents/common/entities/document";
import { createDocumentLink } from '@documents/common/entities/document';
import { updateNeedActionCount } from '@documents/common/features/need-action-count';

const router = useRouter();
const { user } = useUser();

const { updateGrid, resetGrid, instanceGrids } = useGrids();
const gridName = 'documentsList';

const loading = computed(() => { return instanceGrids[gridName].loading });

const eventContext = (fn, event, row) => {
  const { action, instance } = fn(event, row);

  if (action === 'detail') {

    if (!instance.type[0].params || !instance.type[0].params.type_id) throw new Error('Не был передан в грид ID типа документа type_id');

    const documentId = instance.document_id[0].value;
    const documentTypeId = instance.type[0].params.type_id;

    const link = createDocumentLink(documentTypeId, action, documentId);

    router.push(link);
  }

  if (action === 'edit') {

    if (!instance.type[0].params || !instance.type[0].params.type_id) throw new Error('Не был передан в грид ID типа документа type_id');

    ElMessageBox.confirm(`Вы уверены, что хотите редактировать документ с ID - ${instance.document_id[0].value}?`)
      .then(() => {
        const documentId = instance.document_id[0].value;
        const documentTypeId = instance.type[0].params.type_id;

        const link = createDocumentLink(documentTypeId, action, documentId);

        router.push(link);
      })
      .catch(() => {
      })
  }
}

await updateNeedActionCount();

onUnmounted(()=>{
  resetGrid(gridName);
})

</script>