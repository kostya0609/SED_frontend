<template>
	<el-result
		icon="warning"
		title="Процесс еще не был создан!"
		sub-title="Пожалуйста, дождитесь когда процесс будет создан"
	>
		<template
			#extra
			v-if="access.full"
		>
			<CreateProcessButton />
		</template>
	</el-result>
</template>
<script setup>
import { inject } from 'vue';
import { CreateProcessButton } from '@/plugins/process/process/features/process';

const access = inject('access');
</script>