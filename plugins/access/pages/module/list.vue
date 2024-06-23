<template>
  <pre-loader
      :loading="loading"
  >
  <h3>Список модулей</h3>

  <el-table
        :data="modules_table"
        class="mb-15"
        border
        max-height="600"
        stripe
    >
      <el-table-column prop="id"   label="ID" width="70" />
      <el-table-column prop="name" label="Название (rus)"/>
      <el-table-column prop="code" label="Название (eng)"/>
      <el-table-column width="70" align="center">
        <template #default="scope">
          <el-button
              size="small"
              type="info"
              @click="editModule(scope.$index, scope.row)"
          >
            <el-icon><Setting /></el-icon>
          </el-button>

        </template>
      </el-table-column>
    </el-table>

  </pre-loader>
</template>

<script setup>
import {ref, reactive, inject, watchEffect, watch, computed} from "vue";
import preLoader from "@/plugins/access/components/pre_loader.vue";
import { useRouter, useRoute } from 'vue-router';
import {useModuleList} from '@/plugins/access/composables'

const {initModuleList, moduleList} = useModuleList();

const user_id       = inject('_user_id');

const router        = useRouter();
const loading       = ref(false);
const modules_table = reactive([]);

const editModule   = (idx, row) => {
  router.push({name : 'editModule', params : {id : row.id}})
};

await initModuleList(user_id);
modules_table.push(...moduleList.value);

</script>

<style scoped>


</style>