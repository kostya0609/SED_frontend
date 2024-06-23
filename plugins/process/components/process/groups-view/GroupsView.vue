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
import Group from '@/plugins/process/components/process/groups-view/Group.vue';
defineProps({
	groups: Array,
});
</script>
<style scoped lang="scss">
.groups {
	display: flex;
	flex-direction: column;
	row-gap: 1rem;
}
</style>