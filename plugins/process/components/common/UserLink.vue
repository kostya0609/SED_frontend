<template>
  <el-link
    :href="user.link"
    :underline="false"
    class="user-link"
    type="primary"
  >
    <el-image
      :src="user.photo"
      :alt="user.full_name"
      :class="photoClassNames"
      loading="lazy"
      fit="cover"
      v-if="user.photo"
    />
    <span
      class="user-link__fio"
      v-if="user.full_name"
    >
      {{ user.full_name }}
    </span>
  </el-link>
</template>
<script setup>
import { computed } from 'vue';

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
  photoSize: {
    type: String,
    validator: size => ['small', 'medium', 'large'].includes(size),
    default: 'medium',
  },
});

const photoClassNames = computed(() => ['user-link__photo', `user-link__photo--${props.photoSize}`]);
</script>
<style scoped lang="scss">
.user-link {

  :deep(.el-link__inner) {
    gap: .5rem;
  }

  &__photo {
    &--small {
      --user-link-photo-size: 30px;
    }

    &--medium {
      --user-link-photo-size: 35px;
    }

    &--large {
      --user-link-photo-size: 45px;
    }

    width: var(--user-link-photo-size);
    height: var(--user-link-photo-size);
    border-radius: 50%;
    overflow: hidden;
  }
}
</style>