<template>
	<el-popover
		placement="bottom-start"
		:visible="visible"
		popper-class="filter-button__popover-filter"
	>
		<template #reference>
			<el-badge
				is-dot
				type="primary"
				:hidden="!filledFilter"
			>
				<el-button
					@click.stop="changeVisible"
					v-bind="$attrs"
					class="filter-button"
				>
					Фильтр
				</el-button>
			</el-badge>

		</template>
		<Filter
			:filter="filter"
			@change="handleChangeFilter"
			@change-fields="handleChangeFilterFields"
		/>
	</el-popover>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import Filter from './Filter.vue';

const props = defineProps({
	filter: {
		type: Object,
		required: true,
	},
});

const emit = defineEmits(['change']);

const visible = ref(false);
const filledFilter = ref(false);


const changeVisible = () => {
	visible.value = !visible.value;
};

const handleClickOutside = (event) => {
	const popoverEl = document.querySelector('.filter-button__popover-filter'); // Select the popover
	const datePickerPanel = document.querySelector('.el-picker-panel'); // Панель DatePicker
	if (popoverEl && !popoverEl.contains(event.target) &&
		(!datePickerPanel || !datePickerPanel.contains(event.target))) {
		visible.value = false;
	}
};

const handleChangeFilterFields = (fields) => {
	filledFilter.value = false;

	Object.entries(fields)
		.forEach(([fieldName, filter]) => {
			if (Array.isArray(filter.value)) {
				if (filter.value.length > 0) {
					filledFilter.value = true;
				}
			} else if (filter.value) {
				filledFilter.value = true;
			}
		});
};

const handleChangeFilter = () => {
	emit('change');
	visible.value = false;
};

onMounted(() => {
	document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
	document.removeEventListener('click', handleClickOutside);
});

</script>
<style lang="scss" scoped>
.filter-button {
	justify-content: flex-start;
	color: var(--el-color-info);
	margin: 0;
}

:global(.filter-button__popover-filter) {
	width: 100% !important;
	max-width: 700px;
}
</style>
