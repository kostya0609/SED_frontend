<template>
    <Preloader :loading="loading">
        <h3>Редактирование маршрута - {{ documentRoute.title }}</h3>
        <Form
            mode="edit"
            :data="documentRoute"
        />
    </Preloader>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useBackButton } from '@/plugins/menu';
import { Preloader } from '@common/shared/ui/index.js';
import { Form } from '@document-routes/document-route/widgets/form'
import { useDocumentRoute } from "@document-routes/document-route/entities/document-route";

useBackButton({ fallbackPath: '/sed' });

const route = useRoute();
const { documentRoute, loading, initDocumentRoute } = useDocumentRoute();

await initDocumentRoute(route.params.id);

</script>