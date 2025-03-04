<template>
    <Preloader :loading="loading">
        
        <h3
            v-if="documentTemplate"
            class="header_h3"
        >
            {{ documentTemplate.type.title }}. {{ documentTemplate.title }}. Требования маршрута:
        </h3>

        <el-empty v-if="!documentTemplate || !documentTemplate.requirements" />
        <div
            v-else
            v-html="documentTemplate.requirements"
        />

    </Preloader>
</template>

<script setup>
import { Preloader } from "@common/shared/ui";
import { notify } from "@common/shared/utils";
import { DocumentTemplateRepo } from '@documents/common/entities/document-template/shared/api';
import { ref } from "vue";
import { useRoute } from 'vue-router';

const route = useRoute();
const loading = ref(false);

const documentTemplate = ref();

try {
    loading.value = true;

    documentTemplate.value = await DocumentTemplateRepo.get({ id: route.params.id });
    documentTemplate.value.requirements = documentTemplate.value.requirements || '';

} catch (e) {
    notify.fetchError(e.message);
    throw e;
} finally {
    loading.value = false;
}

</script> 

<style scoped>

</style>