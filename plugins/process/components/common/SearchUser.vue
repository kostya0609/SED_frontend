<template>
  <el-select
    :class="classNames"
    filterable
    remote
    reserve-keyword
    :remote-method="search"
    placeholder="Введите ФИО"
    clearable
    :loading="loading"
    v-model="user"
    @change="changeUser"
  >
    <el-option
      v-for="user in users"
      :key="user.id"
      :label="user.full_name"
      :value="user.id"
    />
  </el-select>
</template>
<script setup>
import { computed, ref, watch, inject } from 'vue';
import { notify } from '@/plugins/process/utils';

const { UserRepo } = inject('useRepo');

const props = defineProps({
  block: {
    type: Boolean,
    default: false,
  },
  modelValue: Number,
});

const emit = defineEmits(['update:modelValue', 'change']);

const users = ref([]);
const user = ref(null);
const loading = ref(false);

const search = async (query) => {
  if (!query) return;

  try {
    loading.value = true;
    const result = await UserRepo.search(query);
    users.value = result;
  } catch (e) {
    notify.fetchError(e.message);
    throw e;
  } finally {
    loading.value = false;
  }
};

const changeUser = userId => {
  if (!userId) return;

  const selectedUser = users.value.find(item => item.id === userId);

  if (!selectedUser) {
    throw new Error(`Не удалось найти пользователя в списке по id ${userId}`);
  }

  emit('change', selectedUser);
};

const classNames = computed(() => ({
  'search-user': true,
  'search-user--block': props.block,
}));

watch(user, () => {
  emit('update:modelValue', user.value);
});

defineExpose({
  setUsers: userList => {
    users.value = userList;
  },
  setUser: (id, fio) => {
    users.value = [
      {
        value: id,
        label: fio,
      }
    ];
  },
  resetUser: () => {
    user.value = null;
  },
});
</script>
<style scoped lang="scss">
.search-user {
  &--block {
    width: 100%;
  }
}
</style>