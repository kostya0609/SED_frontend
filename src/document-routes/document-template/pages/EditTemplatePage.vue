<template>
    <Preloader :loading="loading">
        <EszForm
            v-if="documentTemplateTypeId == DOCUMENT_TEMPLATE_TYPE.ESZ"
            mode="edit"
            :data="documentTemplate"
            :routeId="+documentTemplate.route_id"
        />
        <DirectiveForm 
            v-if="documentTemplateTypeId == DOCUMENT_TEMPLATE_TYPE.DIRECTIVE"
            mode="edit"
            :data="documentTemplate"
            :routeId="+documentTemplate.route_id"
        />
        <ReviewForm
            v-if="documentTemplateTypeId == DOCUMENT_TEMPLATE_TYPE.REVIEW"
            mode="edit"
            :data="documentTemplate"
            :routeId="+documentTemplate.route_id"
        />
    </Preloader>
</template>

<script setup>
import { useRoute } from 'vue-router';

import { EszForm } from '@document-routes/document-template/entities/document-template';
import { DirectiveForm } from '@document-routes/document-template/entities/document-template';
import { ReviewForm } from '@document-routes/document-template/entities/document-template';

import { Preloader } from '@common/shared/ui/index.js';
import { useDocumentTemplate } from "@document-routes/document-template/entities/document-template";
import { DOCUMENT_TEMPLATE_TYPE } from '@document-routes/common/shared/constants';

import { useBackButton } from '@/plugins/menu';

useBackButton({ fallbackPath: '/sed' });

const route = useRoute();
const { documentTemplate, loading, initDocumentTemplate } = useDocumentTemplate();

await initDocumentTemplate(route.params.id);

const documentTemplateTypeId = documentTemplate.value.type.id;

</script>
