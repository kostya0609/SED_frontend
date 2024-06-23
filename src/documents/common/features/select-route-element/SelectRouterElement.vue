<template>
	<el-select
		v-model="value"
		@change="handleChangeDocumentType"
	>
		<el-option
			v-for="item in documentTypes"
			:key="item.id"
			:label="item.title"
			:value="item.id"
		/>
	</el-select>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { DocumentTypeRepo } from '@documents/common/entities/document-type';
import { createDocumentLink } from '@documents/common/entities/document';

const router = useRouter();
const value = ref(null);
const documentTypes = ref([]);

try {
	documentTypes.value = await DocumentTypeRepo.getAll();
} catch (e) {
	throw e;
}

const handleChangeDocumentType = (documenTypeId) => {
	router.push(createDocumentLink(documenTypeId, 'create'));
};
</script>