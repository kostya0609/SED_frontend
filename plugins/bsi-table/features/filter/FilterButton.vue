<template>
	<el-popover
		placement="bottom-start"
		:visible="visible"
		popper-class="popover-filter"
	>
		<template #reference>
			<el-input
				v-model="query"
				placeholder="Поиск"
				prefix-icon="Search"
				@input="handleSearch"
				v-if="searchable"
			>
				<template #prepend>
					<el-button
						@click="changeVisible"
						v-bind="$attrs"
						class="filter-button"
					>
						Фильтр
					</el-button>
				</template>
			</el-input>

			<el-button
				@click="changeVisible"
				v-bind="$attrs"
				class="filter-button"
				v-else
			>
				Фильтр
			</el-button>

		</template>
		<Filter
			:filter="filter"
			:state="state"
		/>
	</el-popover>
</template>
<script setup>
import { ref } from 'vue';
import Filter from './Filter.vue';
import { useEventEmitter } from '../../shared/events';

const { emitter } = useEventEmitter();

const props = defineProps({
	filter: {
		type: Object,
		required: true,
	},
	state: {
		type: Object,
		required: false,
		default: null,
	},
	searchable: {
		type: Boolean,
		default: false,
	},
});

const visible = ref(false);

const query = ref('');

const changeVisible = () => {
	visible.value = !visible.value;
};

const handleSearch = async (value) => {
	if (props.searchable) {
		emitter.emit('search', value);
	}
};
</script>
<style lang="scss" scoped>
.filter-button {
	justify-content: flex-start;
	color: var(--el-color-info);
	margin: 0;
}

:global(.popover-filter) {
	width: 100% !important;
	max-width: 700px;
}
</style>
