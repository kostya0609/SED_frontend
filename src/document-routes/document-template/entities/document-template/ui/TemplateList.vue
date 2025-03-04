<template>
	<ul class="participant-list">
		<li
			v-for="template of templates"
			:key="template.id"
		>
			{{ template.type.title }}. {{ template.title }}
		</li>
	</ul>
</template>

<script setup>
const props = defineProps({
	templates: {
		type: Array,
		required: true,
	},
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