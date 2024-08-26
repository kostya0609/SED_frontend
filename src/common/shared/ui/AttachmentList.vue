<template>
    <ul class="attachment-list">
        <li
            v-for="attachment of attachments"
            :key="attachment.id"
        >
            <FileLink :file="attachment.file" />
        </li>
    </ul>
</template>

<script setup>
import { FileLink } from '@/common/shared/ui';

const props = defineProps({
    attachments: Object,
});
</script>

<style scoped lang="scss">
.attachment-list {
    margin: 0;
    padding: 0;
    list-style: none;
}
</style>