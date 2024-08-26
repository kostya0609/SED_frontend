<template>
	<Preloader :loading="loading">
		<Form
			mode="edit"
			:data="document"
		/>
	</Preloader>
</template>

<script setup>

import { useRoute } from 'vue-router';
import { Preloader } from '@common/shared/ui/index.js';
import { Form } from '@documents/directive/widgets/form';
import { useBackButton } from '@/plugins/menu';
import { ref } from "vue";
import { useDocument } from '@documents/directive/entities/directive';

const { document, initDocument } = useDocument();

const route = useRoute();
const loading = ref(false);

await initDocument(route.params.id);

useBackButton({ fallbackPath: '/sed' });
</script>