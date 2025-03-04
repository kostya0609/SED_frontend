<template>
	<div v-if="comment.actions.length">
		<Action
			v-for="action of comment.actions"
			:action="action"
			:key="action.id"
			@click="handleClick(action)"
		/>
	</div>
</template>
<script setup>
import Action from './Action.vue';

const emit = defineEmits(['executeAction']);

const props = defineProps({
	actions: Array,
	comment: Object,
});

const handleClick = (action) => {
	emit('executeAction', action);
};
</script>