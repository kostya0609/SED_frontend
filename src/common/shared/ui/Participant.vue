<template>
	<UserLink
		v-if="participant.type_id === ITEM_TYPE.USER"
		:user="participant.user"
	/>
	<RoleLink
		:role="participant.static_role || participant.dynamic_role"
		:type-role="participant.type_id"
		:user-id="userId"
		:api="{ getStaticUsers: api.getStaticUsers, getDynamicUsers: api.getDynamicUsers }"
		v-else
	/>
</template>
<script setup>
import { ITEM_TYPE } from './user-search-v2/constants';
import { StaticRoleRepo, DynamicRoleRepo } from '../api';
import UserLink from './UserLink.vue';
import { RoleLink } from './user-search-v2';

const userId = window._userId;

defineProps({
	participant: {
		type: Object,
		required: true,
	},
});

const api = {
	getStaticUsers: StaticRoleRepo.getUsersByRoleId.bind(StaticRoleRepo),
	getDynamicUsers: DynamicRoleRepo.getUsersByRoleId.bind(DynamicRoleRepo),
};
</script>