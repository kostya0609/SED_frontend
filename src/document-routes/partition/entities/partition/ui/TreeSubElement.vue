<template>
    <ul class="tree-element">
        <li
            v-for="template in document_templates"
            :key="'document_template_' + template.id"
            class="tree-element__wraper"
        >
            <el-link
                type="primary"
                class="tree-element__link-button"
                :underline=false
                :href="`/sed/admin/document-routes/document-template/detail/${template.id}`"
                target="blank"
            >
                {{ `${template.type.title}. ${template.title}` }}
            </el-link>

            <TreeSubElement
                v-if="template.children && template.children.length"
                :document_templates="template.children"
            />

        </li>
    </ul>
</template>

<script setup>

defineProps({ document_templates: { type: Array, default: [] } });
</script>

<style scoped lang="scss">
.tree-element {
    list-style-type: none;
    margin: 0.25rem 0;
}

.tree-element__wraper {
    margin: 0.25rem 0;
}

.tree-element__button.el-button {
    white-space: normal;
    width: 100%;
    justify-content: flex-start;
    text-align: left;
    padding: 8px 15px
}

.tree-element__button.el-button.is-link:not(.is-disabled):hover {
    background-color: var(--el-fill-color-light);
}

.tree-element__link-button {
    white-space: normal;
    padding: 8px 15px
}

</style>