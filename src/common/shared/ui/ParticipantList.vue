<template>
    <ul class="participant-list">
        <li
            v-for="participant of participants"
            :key="participant.id"
        >
            <UserLink :user="participant.user" />
        </li>
    </ul>
</template>

<script setup>
import { UserLink } from '@/common/shared/ui';

const props = defineProps({
    participants: Object,
});
</script>

<style scoped lang="scss">
.participant-list {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: .5rem;
}
</style>