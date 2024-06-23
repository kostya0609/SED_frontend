<template>
	<Preloader :loading="loading">
		
		<h1 style="color:red; ">В РАЗРАБОТКЕ</h1>
		<br/>

		<Form mode="edit" :data="document" />
	</Preloader>
</template>

<script setup>

import { useRoute } from 'vue-router';
import { Preloader } from '@common/shared/ui/index.js';
import { Form } from '@/documents/esz/widgets/form';
import { useBackButton } from '@/plugins/menu';
import { ESZRepo } from "@/documents/esz/entities/esz/api/index.js";
import { notify } from "@common/shared/utils/index.js";
import { ref } from "vue";

const route = useRoute();
const loading = ref(false);
const document = ref(null);

const getDocument = async (document_id) => {
	try {
		loading.value = true;
		const result = await ESZRepo.getById({ document_id });
		document.value = result;
	} catch (e) {
		notify.fetchError(e.message);
		throw e;
	} finally {
		loading.value = false;
	}
};

await getDocument(route.params.id);

useBackButton({ fallbackPath: '/sed' });
</script>