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
import { useActiveTab } from "@documents/directive/entities/directive";

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