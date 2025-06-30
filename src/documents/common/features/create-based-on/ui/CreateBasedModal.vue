<template>
	<el-drawer
		v-model="show"
		class="based-modal"
		size="50%"
	>
		<template #header>
			<div class="based-modal__title">Создание документов на основании {{ document.number }}</div>
		</template>
		<div class="based-modal__inner">
			<el-checkbox-group
				v-if="templates.length"
				v-model="checkTmpDocs"
				class="based-modal__checkbox checkbox-group"
			>
				<el-checkbox
					v-for="child in templates"
					:key="child.id"
					:label="child.type.title + '. ' + child.title"
					:value="child.id"
					class="checkbox-group__item"
				/>

			</el-checkbox-group>

			<el-checkbox-group
				v-if="documentTypes.length"
				v-model="selectedType"
				class="based-modal__checkbox checkbox-group"
			>
				<el-checkbox
					v-for="type in documentTypes"
					:key="type.id"
					:label="type.title"
					:value="type.id"
					class="checkbox-group__item"
				/>
			</el-checkbox-group>
		</div>

		<template #footer>

			<el-space class="mt-3">

				<el-button @click="show = false">
					Отмена
				</el-button>

				<el-button
					:type="disabledCreateButton ? 'default' : 'primary'"
					@click="handleOkClick"
					:disabled="disabledCreateButton"
				>
					Создать
				</el-button>

			</el-space>

			{{ checkTmpDocs }}
		</template>
	</el-drawer>
</template>

<script setup>
import { computed, ref } from 'vue';
import { DocumentTypeRepo } from '@documents/common/shared/api';
import { notify } from "@common/shared/utils";
import { DocumentTemplateRepo } from '@/documents/common/entities/document-template/shared/api';
import { DOCUMENT_TYPE } from '@/documents/common/shared/constants';

const show = defineModel('show', { default: false });
const props = defineProps({
	document: { type: Object },
	create: {
		type: Function,
		required: true,
	}
});

const documentTypes = ref(null);

const checkTmpDocs = ref([]);

const selectedType = ref([]);

const templates = ref([]);

const disabledCreateButton = computed(() => !checkTmpDocs.value.length && !selectedType.value.length);

const handleOkClick = async () => {
	show.value = false;

	await props.create({
		common_document_id: props.document.common_document_id,
		checkTmpDocs,
		selectedType,
		documentHierarchyId: props.document.document_hierarchy_id,
	});

	checkTmpDocs.value = [];
	selectedType.value = [];
};

try {
	documentTypes.value = await DocumentTypeRepo.list();

	/** Оставляем только ознакомление */
	documentTypes.value = documentTypes.value.filter(({ id }) => id === DOCUMENT_TYPE.REVIEW);

	if (props.document.hierarchy.length && props.document.tmp_doc_id) {
		templates.value = await DocumentTemplateRepo.getTreeTemplates({
			template_id: props.document.tmp_doc_id,
			common_start_document_id: props.document.hierarchy[0].start_document_id,
		});
	}
} catch (e) {
	notify.fetchError(e.message);
	throw e;
}

</script>
<style lang="scss" scoped>
.based-modal {
	&__title {
		font-weight: bold;
	}

	&__checkbox {
		display: flex;
		flex-direction: column;
	}

	&__divider {
		margin: 14px 0;
	}

	&__inner {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		gap: 1rem;
	}
}

:global(.based-modal .el-drawer__body) {
	height: 100%;
}

.checkbox-group {
	&__item {
		width: 100%;
		background-color: #FFF;
		padding: 3px 0 3px var(--el-drawer-padding-primary);
		white-space: normal;
	}

	&__item:nth-child(odd) {
		background-color: var(--el-color-info-light-9);
	}
}
</style>