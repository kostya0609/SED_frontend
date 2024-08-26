<template>
	<el-container>
		<el-main>
			<Menu :rights="rights" />
			<RouterView />
		</el-main>
	</el-container>
</template>
<script setup>

import { onMounted, ref} from 'vue';
import { Menu } from '@/plugins/menu';
import { useUser } from "@/common/app/composables";
import { RouterView } from '@/common/app/providers';

const { initUser, getRights } = useUser();
const rights = ref([]);

onMounted(async () => {
	await initUser(window._userId);
	rights.value = getRights();
});
</script>