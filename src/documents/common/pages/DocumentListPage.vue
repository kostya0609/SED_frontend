<template>
	<Preloader :loading="loading">
		<Grid
			:name="gridName"
			@gridReady="updateGrid(gridName)"
			@eventContext="eventContext"
		/>
		<!-- <el-button @click="sendDefaultFilterData">
			Загрузить дефолтовый фильтр
		</el-button>
		<el-link
			href="/knowledge/instrukcii/rabotasfmdogovory/ "
			target="_blank"
			type="danger"
		>
			Актуальная инструкция по работе с СЭД
		</el-link> -->
	</Preloader>
</template>

<script setup>
import { computed, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessageBox } from 'element-plus';
import { useUser } from '@/common/app/composables';

import { Grid, useGrids } from '@/plugins/vdg3';

import { notify } from "@common/shared/utils";
import { Preloader } from "@common/shared/ui";
import { DocumentRepo } from "@documents/common/entities/document";
import { createDocumentLink } from '@documents/common/entities/document';
import { updateNeedActionCount } from '@documents/common/features/need-action-count';
import { GridRepo } from '@documents/common/shared/api';

const router = useRouter();
const { user } = useUser();

const { updateGrid, resetGrid, instanceGrids } = useGrids();
const gridName = 'documentsList';

const loading = computed(() => { return instanceGrids[gridName].loading });

const eventContext = (fn, event, row) => {
	const { action, instance } = fn(event, row);

	if (action === 'detail') {

		if (!instance.type[0].params || !instance.type[0].params.type_id) throw new Error('Не был передан в грид ID типа документа type_id');

		const documentId = instance.document_id[0].value;
		const documentTypeId = instance.type[0].params.type_id;

		const link = createDocumentLink(documentTypeId, action, documentId);

		router.push(link);
	}

	if (action === 'edit') {

		if (!instance.type[0].params || !instance.type[0].params.type_id) throw new Error('Не был передан в грид ID типа документа type_id');

		ElMessageBox.confirm(`Вы уверены, что хотите редактировать документ с ID - ${instance.document_id[0].value}?`)
			.then(() => {
				const documentId = instance.document_id[0].value;
				const documentTypeId = instance.type[0].params.type_id;

				const link = createDocumentLink(documentTypeId, action, documentId);

				router.push(link);
			})
			.catch(() => {
			})
	}
}

await updateNeedActionCount();

onUnmounted(() => {
	resetGrid(gridName);
});


//ниже чтоб на бэк залить дефолтовый фильтр... надо выше раскоментить нужную кнопку
async function sendDefaultFilterData() {
	//создаст моковый дефолтный фильтр. запустить один раз при разработке, чтоб он записался на бэк
	let defaultFilterData = {
		number: {
			show: true,
			type: 'searchList',
			name: 'Номер',
			multiple: true,
			value: [],
			option: [],
			query: async function (data) {
				let result = await grid.loadJson('/sed/documents/v1/documents/search-by-number', {
					query: data,
				});
				if (result.success) return result.data;
			},
		},
		type_id: {
			show: true,
			type: 'list',
			name: 'Тип докуменат',
			multiple: true,
			value: [],
			option: [
				{ value: 1, label: 'ЭСЗ' },
				{ value: 2, label: 'Поручение' },
				{ value: 3, label: 'Ознакомление' },
			],
		},
		theme: {
			show: true,
			type: 'searchList',
			name: 'Тема',
			min: '',
			max: '',
			operation: '=',
			query: async function (data) {
				let result = await grid.loadJson('/sed/documents/v1/documents/search-by-theme', {
					query: data,
				});
				if (result.success) return result.data;
			},
			value: [],
		},
		status_title: {
			show: true,
			type: 'string',
			name: 'Статус',
			min: '',
			max: '',
			operation: '=',
		},
		initiator_id: {
			show: true,
			type: 'searchList',
			name: 'Ответственный',
			multiple: true,
			value: [],
			option: [],
			query: async function (data) {
				console.log('Test query from grid!');
				let result = await grid.loadJson('/users/v1/search', {
					query: data,
				});
				if (result.success) return result.data
			},
			value: [],
		},
		created_at: {
			show: true,
			type: 'date',
			name: 'Дата создания',
			min: '',
			max: '',
			operation: '=',
		},
		updated_at: {
			show: true,
			type: 'date',
			name: 'Дата изменения',
			min: '',
			max: '',
			operation: '=',
		},
	};


	await GridRepo.loadFilter({
		grid_name: gridName,
		module: 'SED',
		data: { ...defaultFilterData },
	});
}
</script>