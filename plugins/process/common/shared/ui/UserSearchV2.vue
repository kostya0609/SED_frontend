<template>
	<UserSearchV2
		:api="api"
		:userId="userId"
		:dataTransformer="transformers"
	/>
</template>
<script setup>
import { inject } from 'vue';
import { UserSearchV2, Item } from './user-search-v2';

const { DynamicRoleRepo, StaticRoleRepo, UserRepo } = inject('useRepo');

defineProps({
	userId: {
		type: Number,
		required: true,
	},
});

const api = {
	getStaticUsers: StaticRoleRepo.getUsersByRoleId.bind(StaticRoleRepo),
	getDynamicUsers: DynamicRoleRepo.getUsersByRoleId.bind(DynamicRoleRepo),
	searchUser: UserRepo.search.bind(UserRepo),
	searchStaticRole: StaticRoleRepo.getLazyTree.bind(StaticRoleRepo),
	searchDynamicRole: DynamicRoleRepo.search.bind(DynamicRoleRepo),
	getStaticRole: StaticRoleRepo.getById.bind(StaticRoleRepo),
	searchTreeStaticRole: StaticRoleRepo.searchTreeStaticRole.bind(StaticRoleRepo),
};

/**
 * @typedef {import('./user-search-v2/Item').Item} Item
 * @typedef {{ user: object, user_id: number, can_deletable: boolean }} Participant
 */
const transformers = {

	/**
	 * @param {Participant} participant
	 * @returns {Item}
	 */
	inputTransformer(participant) {
		const item = Item.createFromUser(participant.user);
		item.setCanDeletable(participant.can_deletable);
		return item;
	},

	/**
	 * @param {Item} item
	 * @returns {Participant}
	 */
	outputTransformer(item) {
		return {
			user: item.user,
			user_id: item.user_id,
			can_deletable: item.can_deletable,
		};
	},
};
</script>