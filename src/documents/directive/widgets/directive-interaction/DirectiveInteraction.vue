<template>
	<Interaction
		@confirmed-cancellation="handleInteractionEvents"
		@cancelled-cancellation="handleInteractionEvents"
		@confirmed-deadline="handleInteractionEvents"
		@cancelled-deadline="handleInteractionEvents"
		@confirmed-executor-change="handleInteractionEvents"
		@cancelled-executor-change="handleInteractionEvents"
	/>
</template>
<script setup>
import { useActiveTab, useDocument } from '@documents/directive/entities/directive';

const { updateDocument } = useDocument();
const { setActiveTab } = useActiveTab();

const handleInteractionEvents = () => {
	updateDocument();
	setActiveTab('description');
};
</script>