<template>
	<el-button
		:type="type"
		@click="handleClick"
	>
		<slot>
			Отправить на исполнение
		</slot>
	</el-button>
</template>
<script setup>
import { useActiveTab } from "@documents/review/entities/review";

defineProps({
	type: {
		type: String,
		default: 'primary',
	}
});

const { setActiveTab } = useActiveTab();

const handleClick = () => {
	setActiveTab('process');
};
</script>