<template>
	<el-result
		icon="warning"
		title="Страница не найдена!"
		sub-title="Упс! Что-то пошло не так"
	>
	</el-result>
</template>

<script setup>

import { useBackButton } from '@/plugins/menu';
useBackButton();

</script>