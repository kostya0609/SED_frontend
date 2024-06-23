<template>
    <el-select
      :class="['width-full']"
      filterable
      placeholder="Выбрать тему"
      value-key="id"
    >
      <el-option
        v-for="item in themes"
        :key="item.id"
        :label="item.title"
        :value="item"
      />
    </el-select>
  
  </template>
  <script setup>
  import { ref } from 'vue';
  import { notify } from '@common/shared/utils';
  
  const props = defineProps({
    options: {
      type: Array,
      default: [],
    }
  })
  
  const themes = ref(props.options);
 
  defineExpose({
    setThems: themesList => {
      themes.value = themesList;
    },
  });
  </script>
  