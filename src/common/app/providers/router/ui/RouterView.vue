<template>
	<RouterView v-slot="{ Component }">
		<template v-if="Component">
			<Suspense timeout="0">
				<template #default>
					<div class="main-content">
						<component :is="Component" />
					</div>
				</template>
				<template #fallback>
					<Preloader
						:loading="true"
						class="page-preloader"
					/>
				</template>
			</Suspense>
		</template>
		<template v-if="loading">
			<Preloader
				:loading="true"
				class="page-preloader"
			/>
		</template>
	</RouterView>
</template>
<script setup>
import { RouterView, useRouter } from 'vue-router';
import { Preloader } from '@/common/shared/ui';
import { ref } from 'vue';

const router = useRouter();
const loading = ref(false);

router.beforeEach(() => {
	loading.value = true;
});

router.afterEach(() => {
	loading.value = false;
});
</script>