<template>
	<div class="groups">
		<Group
			v-for="group in groups"
			:key="group.id"
			:group="group"
		/>
	</div>
</template>
<script setup>
import Group from '@/plugins/process/components/process/groups-edit/Group.vue';
import { computed } from 'vue';

const props = defineProps({
	groups: Array,
});

const groups = computed(() => props.groups);
</script>
<style scoped lang="scss">
.groups {
	display: flex;
	flex-direction: column;
	row-gap: 1rem;
}
</style>