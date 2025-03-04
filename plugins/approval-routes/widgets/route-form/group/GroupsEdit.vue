<template>
	<div class="groups-edit">
		<AddGroup
			v-model:groups="groups"
			v-model:loading="loading"
		/>

		<el-alert
			type="warning"
			title="Чтобы настраивать порядок групп нужно сохранить изменения"
			:closable="false"
			v-if="!isSortableGroups"
		/>

		<div
			ref="refGroups"
			class="groups"
		>
			<Group
				v-for="(group, idx) in groups"
				:key="group"
				v-model:group="groups[idx]"
				:is-sortable="isSortableGroups"
			/>
		</div>
	</div>
</template>
<script setup>
import { computed, nextTick, ref, watch } from 'vue';
import Group from './Group.vue';
import { moveArrayElement, useSortable } from '@vueuse/integrations/useSortable';
import { AddGroup } from '@/plugins/approval-routes/features/add-group';

const groups = defineModel('groups');
const loading = defineModel('loading');

const isSortableGroups = computed(() => groups.value.find(group => group.id === null) ? false : true);

const refGroups = ref();

const sortable = useSortable(refGroups, groups, {
	handle: '.group-drag',
	draggable: '.group',
	animation: 350,

	onSort(e) {
		moveArrayElement(groups.value, e.oldIndex, e.newIndex);
		nextTick(() => {
			groups.value = groups.value
				.map((item, index) => {
					item.sort = index + 1;
					return item;
				});
		});
	}
});

watch(() => isSortableGroups.value, (isSortable) => {
	isSortable ? sortable.start() : sortable.stop();
});
</script>
<style scoped lang="scss">
.groups,
.groups-edit {
	display: flex;
	flex-direction: column;
	row-gap: 1rem;
}
</style>