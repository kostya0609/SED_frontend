<template>
    <el-select
      :class="['width-full']"
      filterable
      remote
      reserve-keyword
      :remote-method="search"
      placeholder="Введите роль"
      clearable
      :loading="loading"
      value-key="value"
    >
      <el-option
        v-for="item in roles"
        :key="item.value"
        :label="item.label"
        :value="item"
      />
    </el-select>
  
  </template>
  <script setup>
  import { ref } from 'vue';
  import { StaticRoleRepo } from '@common/shared/api/index.js';
  import { notify } from '@common/shared/utils';
  
  const props = defineProps({
    options: {
      type: Array,
      default: [],
    }
  })
  
  const roles = ref(props.options);
  const loading = ref(false);
  
  const search = async (q) => {
    if (!q.trim()) return;
  
    try {
      loading.value = true;
      const result = await StaticRoleRepo.search(q.trim());
  
      roles.value = result;
  
    } catch (e) {
      notify.error(e.message);
      throw e;
    } finally {
      loading.value = false;
    }
  };
  
  defineExpose({
    setRoles: roleList => {
      roles.value = roleList;
    },
    setRole: (value, label) => {
      roles.value = [
        {
          value,
          label          
        }
      ];
    },
  });
  </script>
  