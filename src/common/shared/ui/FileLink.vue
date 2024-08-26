<template>
	<div class="file-link">
		<el-icon size="medium">
			<slot name="icon">
				<Document />
			</slot>
		</el-icon>
		<el-link
			title="Скачать файл"
			:underline="false"
			:href="getDownLoadLink(file.id)"
			type="primary"
			download
		>
			{{ file.original_name }}
		</el-link>
	</div>
</template>

<script setup>
import { getDownLoadLink } from '../utils';

defineProps({
	file: {
		type: Object,
		required: true
	},
})
</script>

<style scoped lang="scss">
.file-link {
	display: inline-flex;
	align-items: center;
	gap: .5rem;
}
</style>