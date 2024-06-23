<template>
	<el-button
		:type="type"
		@click="handleClick"
	>
		<slot>
			Аннулировать документ
		</slot>
	</el-button>
</template>
<script setup>
defineProps({
	type: {
		type: String,
		default: 'danger',
	}
});
const handleClick = () => {
	console.log('TODO: аннулировать документ');
};
</script>