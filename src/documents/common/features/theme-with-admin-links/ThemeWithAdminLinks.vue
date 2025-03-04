<template>
	<div class="theme-with-admin-links">
		<span>{{ themeTitle }}</span>
		<div v-if="checkUserRights('full_access') && templateDocument">
			<el-link
				:href="`/sed/admin/document-routes/document-template/detail/${templateDocument.id}`"
				type="primary"
				:underline="false"
				target="_blank"
			>
				перейти в шаблон
			</el-link>
			<el-divider direction="vertical" />
			<el-link
				:href="`/sed/admin/document-routes/detail/${templateDocument.route_id}`"
				type="primary"
				:underline="false"
				target="_blank"
			>
				перейти в маршрут
			</el-link>
		</div>
	</div>
</template>
<script setup>
import { useUser } from '@/common/app/composables';

const { checkUserRights } = useUser();

defineProps({
	themeTitle: {
		type: String,
		required: true,
	},
	templateDocument: {
		type: Object,
		required: false,
		default: null,
	},
});
</script>
<style scoped>
.theme-with-admin-links {
	display: flex;
	justify-content: space-between;
	gap: .5rem;
	flex-wrap: wrap;
}
</style>