<template>
	<el-form-item
		label="Наименование маршрута"
		prop="title"
	>
		<el-input
			v-model="formData.title"
			type="textarea"
			:rows="1"
			placeholder="Введите название маршрута"
		/>
	</el-form-item>
	<el-form-item
		label="Группа"
		prop="group_id"
	>
		<el-select
			v-model="formData.group_id"
			placeholder="Выбрать группу"
		>
			<el-option
				v-for="group in additionalData.groups"
				:key="group.id"
				:label="group.title"
				:value="group.id"
			/>
		</el-select>
	</el-form-item>
	<el-form-item
		label="Направление"
		prop="direction_id"
	>
		<el-select
			v-model="formData.direction_id"
			placeholder="Выбрать направление"
		>
			<el-option
				v-for="direction in additionalData.directions"
				:key="direction.id"
				:label="direction.title"
				:value="direction.id"
			/>
		</el-select>
	</el-form-item>
	<el-form-item
		label="Раздел"
		prop="partition_id"
	>
		<el-input
			v-model="formData.partition.title"
			readonly
			@click="showPartitionModal = true"
		>
			<template #append>
				<el-button
					type="primary"
					icon="FolderOpened"
					class="select-partition-button"
					@click="showPartitionModal = true"
				>
					Выбрать
				</el-button>
			</template>
		</el-input>
	</el-form-item>

	<el-form-item
		label="Описание маршрута"
		prop="description"
	>
		<el-input
			v-model="formData.description"
			type="textarea"
			:rows="3"
			placeholder="Введите описание маршрута"
		/>
	</el-form-item>
	<el-form-item
		label="Активность маршрута"
		prop="is_active"
	>
		<Switch v-model="formData.is_active" />
	</el-form-item>

	<SelectPartitionModal
		v-model:show="showPartitionModal"
		v-model:current-partition-id="formData.partition_id"
		@change="handleChangePartition"
	/>
</template>

<script setup>
import { ref } from 'vue';
import { Switch } from '@common/shared/ui';
import SelectPartitionModal from './SelectPartitionModal.vue';

const props = defineProps({
	additionalData: Object,
});

const formData = defineModel('formData', { required: true, type: Object });

const showPartitionModal = ref(false);

const handleChangePartition = (partition) => {
	formData.value.partition = partition;
	formData.value.partition_id = partition.id;
	showPartitionModal.value = false;
};
</script>

<style scoped lang="scss">
.select-partition-button {
	border-radius: 0 5px 5px 0;
	display: inline-flex;
}
</style>