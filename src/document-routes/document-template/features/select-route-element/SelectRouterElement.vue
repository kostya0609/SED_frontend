<template>
	<el-select
		v-model="value"
		@change="handleChangeDocumentTemplateType"
	>
		<el-option
			v-for="item in documentTemplateTypes"
			:key="item.id"
			:label="item.title"
			:value="item.id"
		/>
	</el-select>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { DocumentTypeRepo } from '@documents/common/entities/document-type';
import { createDocumentTemplateLink } from '@document-routes/document-template/entities/document-template';

const router = useRouter();
const route = useRoute();
const value = ref(null);
const documentTemplateTypes = ref([]);

try {
	documentTemplateTypes.value = await DocumentTypeRepo.getAll();
} catch (e) {
	throw e;
}

const handleChangeDocumentTemplateType = (documenTemplateTypeId) => {
	router.push(createDocumentTemplateLink(documenTemplateTypeId, 'create', null, route.params.routeId));
};

</script>