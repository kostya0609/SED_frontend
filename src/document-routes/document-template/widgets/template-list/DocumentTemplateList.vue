<template>
	<Preloader :loading="loading">
		<div class="document-template-list__header">
			<el-button
				type="primary"
				@click="$router.push({ name: 'selectRouteElementPage', params: { routeId: $route.params.id } });"
			>
				Добавить шаблон документа
			</el-button>
		</div>

		<el-table
			:data="documentTemplatesTree"
			border
			row-key="branch_id"
			scrollbar-always-on
			@expand-change="handleExpandChange"
			:row-class-name="handleRowClassName"
			default-expand-all
		>

			<el-table-column
				prop="title"
				label="Название"
				v-slot="{ row }"
				width="600"
			>
				<span class="document-template-list__title">
					<el-icon
						size="small"
						color="green"
						title="Автозапуск документа включен"
						v-if="getSetting(row.settings, SETTING.AUTORUN)"
					>
						<VideoPlay />
					</el-icon>
					<el-icon
						size="small"
						color="orange"
						title="Стартовый шаблон документа"
						v-if="row.is_start"
					>
						<PriceTag />
					</el-icon>

					<el-link
						:href="createDocumentTemplateLink(row.type_id, 'detail', row.id, null)"
						@click="handleClick"
						:type="row.is_active ? 'primary' : 'info'"
						:title="row.is_active ? '' : 'Неактивен'"
						:underline="false"
						target="_blank"
					>
						{{ row.title }}
					</el-link>
				</span>
			</el-table-column>

			<el-table-column
				prop="type"
				label="Тип"
				v-slot="{ row }"
			>
				{{ row.type.title }}
			</el-table-column>

			<el-table-column
				prop="creator"
				label="Создатель"
				v-slot="{ row }"
			>
				<UserLink
					v-if="row.creator"
					:user="row.creator"
					disable-photo
					:full-name="false"
				/>
			</el-table-column>

			<el-table-column
				prop="created_at"
				label="Дата создания"
				v-slot="{ row }"
			>
				{{ formatDateTime(row.created_at, formateDataTimeOptions) }}
			</el-table-column>

			<el-table-column
				prop="last_editor"
				label="Последний редактор"
				v-slot="{ row }"
			>
				<UserLink
					v-if="row.last_editor"
					:user="row.last_editor"
					disable-photo
					:full-name="false"
				/>
			</el-table-column>

			<el-table-column
				prop="updated_at"
				label="Дата последнего изменения"
				v-slot="{ row }"
			>
				{{ formatDateTime(row.updated_at, formateDataTimeOptions) }}
			</el-table-column>
		</el-table>

	</Preloader>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import { Preloader } from '@common/shared/ui';
import { useDocumentTemplate } from "@document-routes/document-template/entities/document-template";
import { UserLink } from '@common/shared/ui'
import { formatDateTime } from '@common/shared/utils';
import { createDocumentTemplateLink } from '@document-routes/document-template/entities/document-template';
import { useActiveRoute } from '@document-routes/document-route/entities/document-route';

const route = useRoute();
const { documentTemplatesTree, loading, initDocumentTemplatesTree } = useDocumentTemplate();
const { setActiveRoute } = useActiveRoute();

const formateDataTimeOptions = {
	year: 'numeric',
	month: 'numeric',
	day: 'numeric',
	hour: 'numeric',
	minute: 'numeric',
}

const visibleRowLevels = ref([]);


await initDocumentTemplatesTree(route.params.id);


const SETTING = {
	AUTORUN: 1,
};


/**
 * 
 * @param {any[]} settings
 * @param {number} settingId 
 */
const getSetting = (settings, settingId) => {
	return settings.find(s => s.setting_id === settingId)?.is_active;
};

const getExpandLevel = (element) => {
	let level = null;

	if (element.classList && element.classList.length) {

		for (let name of element.classList) {
			let index = name.lastIndexOf('el-table__row--level-');

			if (index >= 0) {
				level = name.substring(index + 21);
			}
		}

	}

	return level;
};

const changeDisplayTr = (element, level, expand) => {

	let nextElement = element.nextSibling;

	let nextLevel = getExpandLevel(nextElement);

	if (nextLevel > level) {

		if (!expand) {
			nextElement.style.display = 'none';
		};

		if (expand && visibleRowLevels.value.includes(+nextLevel)) {
			nextElement.style.display = '';
		};

		changeDisplayTr(nextElement, level, expand);

	};

};

const handleExpandChange = (row, expand) => {

	let element = document.querySelector('.document_template_id_' + row.branch_id);

	let level = getExpandLevel(element);

	if (level) {

		if (expand) {
			visibleRowLevels.value.push(+level + 1);
		} else {
			let index = visibleRowLevels.value.indexOf(+level + 1);
			if (index > -1) visibleRowLevels.value.splice(index, 1);
		};

		changeDisplayTr(element, level, expand);
	}

};

const handleRowClassName = (data) => {

	return 'document_template_id_' + data.row.branch_id;
};

const handleClick = () => {
	setActiveRoute(window.location.pathname);
};

onMounted(async () => {
	let allTableTrs = document.querySelectorAll('.el-table__row');

	allTableTrs.forEach(element => {

		if (element.classList && element.classList.length) {

			for (let name of element.classList) {
				let index = name.lastIndexOf('el-table__row--level-');

				if (index >= 0) {
					let level = name.substring(index + 21);
					if (level > 0) visibleRowLevels.value.push(+level + 1);
				}
			}

		}

	});
})



</script>

<style scoped lang="scss">
.document-template-list {
	&__header {
		display: flex;
		justify-content: right;
		margin-bottom: 15px;
	}

	&__title {
		display: inline-flex;
		align-items: center;
		gap: .25rem;
	}
}
</style>
