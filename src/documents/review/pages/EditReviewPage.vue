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
import { Form } from '@documents/review/widgets/form';
import { useBackButton } from '@/plugins/menu';
import { ref } from "vue";
import { useDocument } from '@documents/review/entities/review';

const route = useRoute();
const loading = ref(false);

const { document, initDocument } = useDocument();

await initDocument(route.params.id);

useBackButton({ fallbackPath: '/sed' });
</script>