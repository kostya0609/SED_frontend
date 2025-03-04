<template>
	<div v-if="activeParticipants.length > 1 || (activeParticipants.length === 1 && isActiveCurrentParticipant)">
		<el-alert
			type="warning"
			:closable="false"
		>
			Если вы хотите принять решение за одного из участников процесса, выберите его в выпадающем списке.
		</el-alert>
		<br />
		<el-select
			v-model="subuserId"
			placeholder="Принять решение за..."
			clearable
		>
			<el-option
				v-for="item in activeParticipants"
				:key="item.id"
				:label="item.user.full_name"
				:value="item.user.id"
			>
			</el-option>
		</el-select>
	</div>
	<el-alert
		type="warning"
		:closable="false"
		v-else-if="activeParticipants.length === 1"
	>
		Принять решение за участника: <b>{{ activeParticipants[0].user.full_name }}</b>
	</el-alert>
</template>
<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
	supervisorParticipants: {
		type: Object,
		required: true,
	},
});

const subuserId = defineModel({ default: null });
const activeParticipants = ref([]);
const isActiveCurrentParticipant = ref(false);

watch([() => props.supervisorParticipants], ([result]) => {
	activeParticipants.value = result.participants;
	isActiveCurrentParticipant.value = result.is_active;

	if (activeParticipants.value.length === 0 || (activeParticipants.value.length === 1 && isActiveCurrentParticipant.value)) {
		subuserId.value = null;
	} else if (activeParticipants.value.length === 1) {
		subuserId.value = activeParticipants.value[0].user.id;
	}
}, { immediate: true });
</script>