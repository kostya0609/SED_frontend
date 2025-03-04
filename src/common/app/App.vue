<template>
	<el-container>
		<el-main>
			<Menu :rights="rights" />
			<RouterView />
			<Instruction
				:links="instructionLinks"
			/>
		</el-main>
	</el-container>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { Menu } from '@/plugins/menu';
import { useUser } from "@/common/app/composables";
import { RouterView } from '@/common/app/providers';
import { Instruction } from '@common/shared/ui';

const { initUser, getRights } = useUser();
const rights = ref([]);

const instructionLinks = [
	{
		title: 'Работа с функциональным модулем "СЭД 2.0" на корпоративном портале',
		link: '/knowledge/instrukcii/rabotasfmsed20/',
	}
];

onMounted(async () => {
	await initUser(window._userId);
	rights.value = getRights();
});
</script>