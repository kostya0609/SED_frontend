<template>
    <EszForm
        v-if="documentTemplateTypeId == DOCUMENT_TEMPLATE_TYPE.ESZ"
         mode="create"
        :routeId="+$route.params.routeId"
    />
    <DirectiveForm
        v-if="documentTemplateTypeId == DOCUMENT_TEMPLATE_TYPE.DIRECTIVE"
        mode="create"
        :routeId="+$route.params.routeId"
    />
    <ReviewForm
        v-if="documentTemplateTypeId == DOCUMENT_TEMPLATE_TYPE.REVIEW"
        mode="create"
        :routeId="+$route.params.routeId"
    />
</template>

<script setup>
import { useRoute } from 'vue-router';

import { EszForm } from '@document-routes/document-template/entities/document-template';
import { DirectiveForm } from '@document-routes/document-template/entities/document-template';
import { ReviewForm } from '@document-routes/document-template/entities/document-template';

import { useBackButton } from '@/plugins/menu';

import { DOCUMENT_TEMPLATE_TYPE } from '@document-routes/common/shared/constants';

const route = useRoute();
const documentTemplateTypeId = route.params.type;

useBackButton({ fallbackPath: '/sed' });

</script>