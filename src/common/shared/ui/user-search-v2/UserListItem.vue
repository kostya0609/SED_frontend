<template>
	<div
		class="user-list-item"
		:class="{ 'user-list-item--disabled': disabled }"
	>
		<div class="user-list-item__title">
			<UserLink
				v-if="item.type_id === ITEM_TYPE.USER"
				:user="item.user"
			/>
			<RoleLink
				:role="item.static_role || item.dynamic_role"
				:type-role="item.type_id"
				:user-id="userId"
				:api="{ getStaticUsers: api.getStaticUsers, getDynamicUsers: api.getDynamicUsers }"
				v-else
			/>
		</div>
		<div
			class="user-list-item__buttons"
			v-if="!disabled"
		>
			<el-tooltip
				effect="dark"
				content="Возможность удалить"
				placement="left-start"
				v-if="deletion"
			>
				<el-switch
					v-model="item.can_deletable"
					size="small"
					@change="$emit('change')"
				/>
			</el-tooltip>
			<el-button
				type="danger"
				icon="Delete"
				circle
				size="small"
				plain
				@click="$emit('delete', item)"
				:disabled="!deletion && !item.can_deletable"
			/>
		</div>
	</div>
</template>
<script setup>
import { inject } from 'vue';
import { ITEM_TYPE } from './constants';
import UserLink from './UserLink.vue';
import RoleLink from './RoleLink.vue';

const userId = inject('userId');
const api = inject('api');
const deletion = inject('deletion');

defineProps({
	disabled: {
		type: Boolean,
		default: false
	},
});

const item = defineModel({ type: Object, required: true });

defineEmits(['delete', 'change']);
</script>
<style lang="scss" scoped>
.user-list-item {
	display: flex;
	align-items: center;
	padding: .35rem .25rem;
	border-radius: var(--el-border-radius-base);
	transition: 350ms;

	&:not(&--disabled):hover {
		background-color: #EFEFEF;
		transition: 350ms;
	}

	&:not(:first-child) {
		border-top: 1px solid #EEE;
	}

	&__title {
		flex: 1;
	}

	&__buttons {
		display: flex;
		align-items: center;
		gap: .5rem;
	}
}

.role-item {
	display: flex;
	align-items: center;
	gap: .35rem;
	font-size: 14px;

	&__icon:deep(.el-icon) {
		vertical-align: middle;
		color: var(--el-color-primary);
	}
}
</style>