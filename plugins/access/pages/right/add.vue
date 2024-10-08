<template>
  <pre-loader
      :loading="loading"
      class="right-add"
  >

    <h3>{{route.name === 'addRight' ? 'Добавление' : 'Редактирование'}} права</h3>

    <el-row v-if="global && route.name === 'addRight'" class="mb-15">
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
        <label class="label">Название права (rus)</label>
        <el-autocomplete
          v-model="form_data.name"
          :fetch-suggestions="rightSearch"
          :trigger-on-focus="true"
          :class="['width-full']"
          placeholder="Введите название права(rus)"
        />
      </el-col>

    </el-row>

    <el-row class="mb-15">
      <el-col :md="12">
        <label class="label">Примечание</label>
        <el-input
            v-model="form_data.note"
            :class="['width-full']"
            type="textarea"
            rows="3"
            placeholder="Введите примечание"
        />
      </el-col>
    </el-row>

    <el-row>
      <el-col>
        <el-button
            type="primary"
            @click="saveRight"
        >
          Сохранить право
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

import { useRightRepo } from '@/plugins/access/repositories';
import {useModuleList} from '@/plugins/access/composables'

const {initModuleList, moduleList} = useModuleList();

const RightRepo =  useRightRepo();

const global        = inject('_global');
const module        = inject('_module');
const user_id       = inject('_user_id');
const useBackButton = inject(USE_BACK_BUTTON_KEY);

const router              = useRouter();
const route               = useRoute();
const loading             = ref(false);
const form_data           = reactive({
  id   : null, //для редактирования
  name : '',
  note : '',
});
const errors              = reactive({
  module  : null,
  name    : null,
});
let rights                = ref([]);

const createFilter        = (query) => {
  return (right) => {
    return (
        right.name.toLowerCase().indexOf(query.toLowerCase()) === 0
    )
  }
}
const rightSearch         = (query, cb) => {
  const results = query ? rights.value.filter(createFilter(query, 'name')) : rights.value
  cb(results.map(el => ( { value : el.name} ) ));
};

const getEditRight        = async() => {
  try {
    loading.value = true;
    let result = await RightRepo.get({
      user_id,
      right_id : route.params.id
    });

    if(result.data){
      form_data.id   = result.data.id;
      form_data.name = result.data.name;
      form_data.note = result.data.note;
    }

  } catch (e) {
    notify({title : 'Ошибка при выполнении запроса на получение данных права', message : e.message, type : 'error'});
  } finally {
    loading.value = false;
  }
};
route.name === 'editRight' ? await getEditRight() : '';

if (global) await initModuleList(user_id);

const getRights           = async() => {
  try {
    loading.value = true;
    let result = await RightRepo.all({
      user_id
    });

    if (result.data)
      rights.value = result.data

  } catch (e) {
    notify({title : 'Ошибка при выполнении запроса получения списка групп', message : e.message, type : 'error'});
  } finally {
    loading.value = false;
  }

};
getRights();


const valid               = () => {
  let isValid = true;
  if(!module.value && route.name === 'addRight') {isValid = false; errors.module = 'Необходимо выбрать модуль!'}
  if(!form_data.name)                            {isValid = false; errors.name   = 'Необходимо ввести название права!'}
  return isValid;
};

const saveRight           = async() => {
  if(!valid())return;

  let send_right = {
    module   : module.value,
    right_id : form_data.id,
    name     : form_data.name,
    note     : form_data.note,
    user_id,
  };

  if(route.name === 'addRight'){
    try {
      loading.value = true;
      let result = await RightRepo.add(send_right);
      router.push({name : 'listRight'})
    } catch (e) {
      notify({title : 'Ошибка при выполнении запроса на создание права', message : e.message, type : 'error'});
    } finally {
      loading.value = false;
    }
  }else{
    try {
      loading.value = true;
      let result = await RightRepo.edit(send_right);
      router.push({name : 'listRight'})
    } catch (e) {
      notify({title : 'Ошибка при выполнении запроса на редактирование права', message : e.message, type : 'error'});
    } finally {
      loading.value = false;
    }
  }
};

useBackButton();

watch(
   () => form_data.name,
   () => {
      form_data.name = form_data.name.replace(/[^а-яё\s]+/iu, '');
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
.border-red{
  border: red solid 1px ;
}
.width-full{
  width: 100%;
}

.right-add:deep(.border-red){
  border: red solid 1px ;
}

.right-add:deep(.width-full){
  width: 100%;
}

.right-add:deep(.el-table .cell){
  word-break: break-word!important;
}


</style>