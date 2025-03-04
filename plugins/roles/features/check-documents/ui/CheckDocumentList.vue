<template>
	<div v-if="documents">
		<ul class="document-list">
			<li
				v-for="document in documents"
				:key="document.id"
				class="document-item"
			>
				<el-tooltip
					:content="document.title"
					placement="bottom-start"
					effect="light"
					:show-after="1000"
				>
					<el-link
						:href="document.link"
						target="_blank"
						:underline="false"
						class="document-item-link"
					>
						<el-icon>
							<Document />
						</el-icon>
						<span>{{ truncateTitle(document.title) }}</span>
					</el-link>
				</el-tooltip>
			</li>
		</ul>
		<el-alert
			type="info"
			description="Роль не используется в шаблонах документов"
			:closable="false"
			show-icon
			v-show="!documents.length"
		/>
	</div>
</template>
<script setup>
const props = defineProps({
	documents: {
		type: Array,
		required: false,
	},
});

const truncateTitle = (title) => {
	return title.length > 240 ? title.substring(0, 240) + '...' : title;
};
</script>
<style lang="scss" scoped>
.document-list {
	list-style: none;
	margin: 0;
	padding: 0;
}

.document-item {
	padding: .5rem;
	border-radius: var(--el-border-radius-base);
	transition: background-color 0.3s;

	&:hover {
		background-color: var(--el-color-info-light-9);
	}
}

.document-item-link:deep(.el-link__inner) {
	gap: .25rem;
}
</style>