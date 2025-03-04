<template>
	<el-link
		:underline="false"
		:href="user.link"
	>
		<div
			class="user-link"
			v-if="user"
		>
			<UserAvatar
				:photo="user.photo"
				:gender="user.gender"
			/>
			<div class="user-info">
				<span
					class="u-position"
					v-if="user.position"
				>{{
					user.position
				}}</span>
				<span class="u-name">{{ user.abbreviated_name }}</span>
			</div>
		</div>
	</el-link>
</template>

<script setup>
import UserAvatar from './UserAvatar.vue';

const props = defineProps({
	user: {
		type: Object,
		required: true,
	},
	disablePhoto: {
		type: Boolean,
		default: false,
	},
	fullName: {
		type: Boolean,
		default: true,
	}
});
</script>
<style scoped lang="scss">
:deep(.el-link) {
	width: 100%;
	display: inline-block;
}

.user-link> :first-child {
	width: 36px;
	height: 36px;
}

.user-link {
	display: flex;
	align-items: center;
	gap: 8px;

	.user-info {
		display: flex;
		flex-direction: column;
	}

	.u-name {
		font-weight: 500;
		font-size: 12px;
		line-height: 12px;
	}

	.u-position {
		font-size: .7em;
		color: #666;
		height: 15px;
		line-height: 15px;
		color: #2fc6f6;
		width: 145px;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.user-avatar {
		width: 36px !important;
		height: 36px !important;
	}
}
</style>
