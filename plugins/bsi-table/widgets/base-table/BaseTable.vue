<template>
	<div class="bsi-table">
		<div class="bsi-table__header">
			<slot name="prepend-header" />
			<ColumnsSettingsButton
				v-model="columnsObjects"
				@change="handleChangeColumns"
				v-if="customizable"
			/>
			<el-pagination
				class="bsi-table__pagination"
				layout="jumper, prev, pager, next, sizes, total"
				@size-change="handlePaginateSizeChange"
				@current-change="handlePaginateCurrentChange"
				v-model:current-page="currentPage"
				v-model:page-size="perPage"
				:page-sizes="paginate.pageSizes"
				:total="total"
			/>
			<slot name="append-header" />
		</div>

		<div class="bsi-table__body">
			<el-table
				v-bind="{ ...$attrs, defaultSort, scrollbarAlwaysOn, data }"
				@sort-change="handleSortChange"
				@header-dragend="handleHeaderDragend"
				v-loading="loading"
			>
				<component :is="renderColumns" />
			</el-table>
		</div>

		<div class="bsi-table__footer">
			<slot name="prepend-footer" />
			<el-pagination
				class="bsi-table__pagination"
				layout="jumper, prev, pager, next, sizes, total"
				@size-change="handlePaginateSizeChange"
				@current-change="handlePaginateCurrentChange"
				v-model:current-page="currentPage"
				v-model:page-size="perPage"
				:page-sizes="paginate.pageSizes"
				:total="total"
			/>
			<slot name="append-footer" />
		</div>
	</div>
</template>
<script setup>
import { injectLocal } from '@vueuse/core';
import { usePaginate } from './usePaginate';
import { reactive, watch, onMounted, nextTick, computed } from 'vue';
import { useRenderColumns } from './useRenderColumns';
import { ColumnsSettingsButton } from '../../features/columns-settings';
import { useSortable } from '@vueuse/integrations/useSortable';

const emitter = injectLocal('emitter');
const loading = injectLocal('loading');

const data = defineModel('data', { default: [] });
const _total = defineModel('total', { default: 0 });
const currentPage = defineModel('currentPage', { default: 1 });

const props = defineProps({
	customizable: { type: Boolean, default: true },
	scrollbarAlwaysOn: { type: Boolean, default: false }
});

const customizable = computed(() => props.customizable);

const defaultSort = reactive({});
const paginate = reactive({
	currentPage: 1,
	pageSizes: [10, 20, 50],
});

const { perPage, total } = usePaginate(paginate.currentPage, paginate.pageSizes[0], _total.value);
const { renderColumns, columnsObjects } = useRenderColumns();

const handlePaginateSizeChange = (perPage) => {
	emitter.emit('state-save', { paginate: { perPage } });

	emitter.emit('change-data', {
		paginate: {
			page: currentPage.value,
			perPage: perPage,
		}
	});
};

const handlePaginateCurrentChange = (currentPage) => {
	emitter.emit('state-save', {
		paginate: {
			page: currentPage,
		}
	}, 'local');

	emitter.emit('change-data', {
		paginate: {
			perPage: perPage.value,
			page: currentPage,
		}
	});
};

const handleSortChange = ({ prop, order }) => {
	const sort = {
		[prop]: order,
	};

	emitter.emit('state-save', { sort });
	emitter.emit('change-data', { sort });
};

const handleChangeColumns = (columns) => {
	emitter.emit('state-save', { columns });
};

const handleHeaderDragend = (newWidth, _oldWith, column, _event) => {
	const columnObject = columnsObjects.value.find(_column => _column.prop === column.property);

	columnObject.width = newWidth;

	handleChangeColumns(columnsObjects.value);
};

useSortable('.bsi-table table.el-table__header tr', columnsObjects, {
	onSort() {
		nextTick(() => {
			columnsObjects.value = columnsObjects.value
				.map((item, index) => {
					item.order = index;
					return item;
				});

			handleChangeColumns(columnsObjects.value);
		});
	}
});

onMounted(() => {
	emitter.on('state-loaded', (state) => {
		if (!state) {
			return;
		}

		if (state.paginate) {
			perPage.value = state.paginate.perPage;
			currentPage.value = state.paginate.page || 1;
		}

		if (state.sort) {
			const item = Object.entries(state.sort);

			if (!Array.isArray(item)) {
				console.warn('Invalid sort state');
			} else {
				if (item.length > 0) {
					defaultSort.prop = item[0][0];
					defaultSort.order = item[0][1];
				}
			}
		}
	});
});

watch(() => _total.value, (_total) => {
	total.value = _total;
}, { immediate: true });
</script>
<style scoped lang="scss">
.bsi-table {

	&__header,
	&__footer {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding-bottom: .5rem;

		&:deep(.el-button+.el-button) {
			margin-left: 0;
		}
	}

	&__footer {
		padding-top: .5rem;
	}

	&__pagination {
		margin-left: auto;
	}
}

:deep(.el-scrollbar__bar) {
	bottom: unset;
	top: 2px;
}
</style>