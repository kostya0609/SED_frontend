<template>
  <el-select
    v-model="users"
    :class="['width-full']"
    filterable
    remote
    reserve-keyword
    :remote-method="search"
    placeholder="Введите ФИО"
    clearable
    :loading="loading"
    value-key="id"
    collapse-tags
    :multiple
    @blur="userList = multiple ? users : users ? [users] : []"  
  >
  
    <el-option
      v-for="item in userList"
      :key="item.id"
      :label="item.full_name"
      :value="item"
    />
  </el-select>
</template>

<script setup>
import { ref } from 'vue';
import { UserRepo } from '@common/shared/api/index.js';
import { notify } from '@common/shared/utils';

const users = defineModel();

const props = defineProps({
  options: {
    type: Array,
    default: [],
  },
  multiple: {
    type: Boolean,
    default: false,
  }
});

const userList = ref(props.options);
const loading = ref(false);

const search = async (query) => {
  if (!query.trim()) return;

  try {
    loading.value = true;

    userList.value = await UserRepo.search(query.trim());

  } catch (e) {
    notify.error(e.message);
    throw e;
  } finally {
    loading.value = false;
  }
};

defineExpose({
  setUsers: userList => {
    users.value = userList;
  },
  setUser: (id, full_name, photo = null, link = null) => {
    users.value = [
      {
        value: id,
        label: full_name,
        photo,
        link,
      }
    ];
  },
});
</script>
