<template>
  <pre-loader
      :loading="loading"
      class="group-add"
  >

    <h3>Добавление группы</h3>
    <el-row v-if="global" class="mb-15">
      <el-col :md="12">
        <label class="label">Название модуля</label>
        <el-select
            v-model="module"
            :class="[{'border-red' : errors.module}, 'width-full']"
            placeholder="Выбрать"
        >
          <el-option
              v-for="item in moduleList"
              :key="item.code"
              :label="item.name"
              :value="item.code"
          >
          </el-option>
        </el-select>
        <small v-if="errors.module" class="font-red">{{errors.module}}</small>
      </el-col>
    </el-row>

    <el-row class="mb-15">
      <el-col :md="12">
        <label class="label">Название группы(rus)</label>
        <el-autocomplete
            v-model="form_data.name"
            :fetch-suggestions="groupSearch"
            :trigger-on-focus="true"
            :class="[{'border-red' : errors.name}, 'width-full']"
            placeholder="Введите название группы(rus)"
        />
        <small v-if="errors.name" class="font-red">{{errors.name}}</small>
      </el-col>
    </el-row>

    <el-row class="mb-15">
      <el-col :md="12">
        <label class="label">Примечание</label>
        <el-input
            v-model="form_data.note"
            type="textarea"
            rows="3"
            :class="['width-full']"
            placeholder="Введите примечание"
        />
      </el-col>
    </el-row>

    <el-row>
      <el-col>
        <el-button
            type="primary"
            @click="saveGroup"
        >
          Сохранить группу
        </el-button>
      </el-col>
    </el-row>

  </pre-loader>
</template>

<script setup>

import {ref, reactive, inject, watchEffect, watch} from "vue";
import { useRouter, useRoute } from 'vue-router';
import preLoader from "@/plugins/access/components/pre_loader.vue";
import {USE_BACK_BUTTON_KEY} from "@/plugins/access/shared/symbols";
import { useModuleRepo, useGroupRepo } from '@/plugins/access/repositories';
import { notify } from '@/plugins/access/shared/utils/';
import {useModuleList} from '@/plugins/access/composables'

const {initModuleList, moduleList} = useModuleList();

const ModuleRepo = useModuleRepo();
const GroupRepo = useGroupRepo();

const global        = inject('_global');
const module        = inject('_module');
const user_id       = inject('_user_id');
const useBackButton = inject(USE_BACK_BUTTON_KEY);

const router    = useRouter();
const route     = useRoute();
const loading   = ref(false);
const form_data = reactive({
  name : '',
  note : '',
});
const errors           = reactive({
  module : null,
  name   : null,
});

let groups             = ref([]);

const createFilter     = (query) => {
  return (group) => {
    return (
      group.name.toLowerCase().indexOf(query.toLowerCase()) === 0
    )
  }
}

const groupSearch      = (query, cb) => {
  const results = query ? groups.value.filter(createFilter(query, 'name')) : groups.value
  cb(results.map(el => ( { value : el.name} ) ));
};

if (global) await initModuleList(user_id);

const getGroups        = async() => {
  try {
    loading.value = true;
    let result = await GroupRepo.all({
      user_id
    });

    if (result.data)
      groups.value = result.data

  } catch (e) {
    notify({title : 'Ошибка при выполнении запроса получения списка групп', message : e.message, type : 'error'});
  } finally {
    loading.value = false;
  }

};
getGroups();

const valid            = () => {
  let isValid = true;
  if(!module.value)   {isValid = false; errors.module = 'Необходимо выбрать модуль!'}
  if(!form_data.name) {isValid = false; errors.name   = 'Необходимо указать название группы (rus)!'}
  return isValid;
};

const saveGroup        = async () => {
  if(!valid())return;

  try {
    loading.value = true;
    let result = await ModuleRepo.attachRole({
      name   : form_data.name,
      note   : form_data.note,
      module : module.value,
      user_id,
    });

    router.push({name : 'listGroup'})

  } catch (e) {
    notify({title : 'Ошибка при выполнении запроса создания группы', message : e.message, type : 'error'});
  } finally {
    loading.value = false;
  }

};

useBackButton();

watch(
    () => form_data.name,
    () => {
      form_data.name = form_data.name.replace(/[^а-яё_\s0-9]+/iu, '');
    }
)

watchEffect(() => {
  module.value   ? errors.module = null : '';
  form_data.name ? errors.name   = null : '';
});

</script>

<style scoped>
.label{
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
}
.mb-15{
  margin-bottom: 15px;
}
.el-col-md-12{
  padding-right: 25px;
}
.font-red{
  color: red;
  font-weight: bold;
}
.group-add:deep(.border-red){
  border: red solid 1px ;
}

.group-add:deep(.width-full){
  width: 100%;
}

</style>