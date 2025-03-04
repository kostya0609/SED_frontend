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
import { computed } from 'vue';
import Group from './Group.vue';

const props = defineProps({
	groups: Array,
});

const groups = computed(() => props.groups);
</script>
<style scoped lang="scss">
.groups {
	display: flex;
	flex-direction: column;
	row-gap: 2rem;
}
</style>