<template>
	<el-dropdown
		trigger="click"
		@command="handleCommand"
	>
		<el-button
			type="info"
			text
		>
			Предустановленные удаленные участники
			<el-icon class="el-icon--right">
				<arrow-down />
			</el-icon>
		</el-button>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item
					v-for="participant in removedParticipants"
					:key="participant.id"
					:command="participant"
				>
					{{ participant.user.full_name }}
				</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>
<script setup>
/**
 * @deprecated
 */

defineProps({
	removedParticipants: Array,
});

const emit = defineEmits(['change']);

const handleCommand = (participant) => {
	emit('change', participant.user);
};
</script>