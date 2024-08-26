<template>
    <Preloader :loading="loading">
        <h3 class="header_h3">
            Информация о шаблоне документа - {{ documentTemplate.title }}
        </h3>

        <el-tabs
            v-model="activeTab"
            type="border-card"
        >
            <el-tab-pane
                label="Шаблон документа"
                name="description"
                lazy
            >
                <EszDescription
                    v-if="documentTemplateTypeId == DOCUMENT_TEMPLATE_TYPE.ESZ"
                    :documentTemplate="documentTemplate"
                />
                <DirectiveDescription
                    v-if="documentTemplateTypeId == DOCUMENT_TEMPLATE_TYPE.DIRECTIVE"
                   :documentTemplate="documentTemplate"
                />
                <ReviewDescription
                    v-if="documentTemplateTypeId == DOCUMENT_TEMPLATE_TYPE.REVIEW"
                    :documentTemplate="documentTemplate"
                />

                <el-space class="mt-3">
                    <ChangeDataButton />
                    <TemplateDeleteButton :id="documentTemplate.id" />
                    <TemplateDeactivateButton
                        :id="documentTemplate.id"
                        :disabled="!documentTemplate.is_active"
                        @update="updateDocumentTemplate"
                    />
                </el-space>

            </el-tab-pane>

            <el-tab-pane
                label="Требования маршрута"
                name="requirements"
                lazy
            >
                <Requirements :documentTemplate="documentTemplate" />

            </el-tab-pane>

            <el-tab-pane
                label="Маршруты согласования"
                name="approveRoutes"
                lazy
            >
                <ApproveRoutes :documentTemplate="documentTemplate" />
            </el-tab-pane>
        </el-tabs>

    </Preloader>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { Preloader } from '@common/shared/ui/index.js';
import { useDocumentTemplate } from "@document-routes/document-template/entities/document-template";
import { useBackButton } from '@/plugins/menu';

import { EszDescription } from '@document-routes/document-template/entities/document-template';
import { DirectiveDescription } from '@document-routes/document-template/entities/document-template';
import { ReviewDescription } from '@document-routes/document-template/entities/document-template';

import { Requirements } from '@document-routes/document-template/widgets/requirements'
import { ApproveRoutes } from '@document-routes/document-template/widgets/approve-routes'

import { ChangeDataButton } from '@document-routes/document-template/features/change-data';
import { TemplateDeleteButton } from '@document-routes/document-template/features/template-delete';
import { TemplateDeactivateButton } from '@document-routes/document-template/features/template-deactivate';
import { DOCUMENT_TEMPLATE_TYPE } from '@document-routes/common/shared/constants';

import { ref } from 'vue';

useBackButton({ fallbackPath: '/sed' });

const route = useRoute();
const { documentTemplate, loading, initDocumentTemplate, updateDocumentTemplate } = useDocumentTemplate();


await initDocumentTemplate(route.params.id);

const documentTemplateTypeId = documentTemplate.value.type.id;

const activeTab = ref('description');

</script>
