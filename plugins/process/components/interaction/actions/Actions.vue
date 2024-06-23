<template>
	<el-button-group>
		<Action
			v-for="action of actions"
			:action="action"
			:key="action.id"
			@click="handleClick(action)"
		/>
	</el-button-group>
</template>
<script setup>
import Action from './Action.vue';

const emit = defineEmits(['executeAction']);

defineProps({
	actions: Array,
});

const handleClick = (action) => {
	emit('executeAction', action);
};
</script>