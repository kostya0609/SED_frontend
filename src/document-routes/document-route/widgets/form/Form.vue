<template>
	<Preloader :loading="loading">
		<el-form
			:model="formData"
			:rules="rules"
			label-width="auto"
			label-position="left"
			ref="form"
			class="form"
		>
			<el-row :gutter="20">
				<el-col :md="12">
					<MainFiels
						v-model:formData="formData"
						:additionalData="additionalData"
					/>
				</el-col>

				<el-col :md="12">
					<el-form-item
						prop="departments"
						label="Доступность маршрута в подразделениях:"
						label-position="top"
					>
						<DepartmentTree
							:disabled="false"
							v-model="formData.departments"
						/>
					</el-form-item>
				</el-col>
			</el-row>

			<el-button
				type="primary"
				@click="submit"
			>
				Сохранить данные
			</el-button>
		</el-form>
	</Preloader>
</template>

<script setup>

import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { DocumentRouteRepo } from '@document-routes/document-route/entities/document-route';
import { Preloader } from '@common/shared/ui';
import MainFiels from './MainFields.vue';

import { notify } from '@common/shared/utils';
import { DepartmentTree } from '../department-tree';

const props = defineProps({
	mode: String,
	data: {
		type: Object,
		required: false,
		default: null,
	},
});

const loading = ref(false);
const form = ref();

const router = useRouter();

const additionalData = ref();

const formData = reactive({
	id: null,
	title: null,
	direction_id: null,
	group_id: null,
	partition_id: null,
	partition: {
		id: null,
		title: null,
	},
	description: null,
	is_active: true,
	departments: [],
});

const rules = reactive({
	title: { required: true, message: 'Необходимо ввести название маршрута' },
	direction_id: { required: true, message: 'Необходимо выбрать направление маршрута' },
	group_id: { required: true, message: 'Необходимо выбрать направление маршрута' },
	partition_id: { required: true, message: 'Необходимо выбрать раздел маршрута' },
	description: { required: false, message: 'Необходимо ввести описание маршрута' },
	departments: { required: true, message: 'Необходимо выбрать департаменты, которым будет доступен этот маршрута' },
});

const submit = async () => {
	form.value.validate(async (isValid) => {
		if (!isValid) return;

		try {
			let result;
			loading.value = true;

			if (props.mode === 'create') {
				result = await DocumentRouteRepo.create(formData);
			} else {
				result = await DocumentRouteRepo.edit(formData);
			}

			router.push({ name: 'detailDocumentRoutePage', params: { id: result.id } });
		} catch (e) {
			notify.fetchError(e.message);
			throw e;
		} finally {
			loading.value = false;
		}

	});
};

if (props.mode === 'edit') {

	const {
		id,
		title,
		direction,
		group,
		partition,
		description,
		is_active,
		departments,
	} = props.data;

	formData.id = id;
	formData.title = title;
	formData.direction_id = direction.id;
	formData.group_id = group.id;

	formData.partition = partition;
	formData.partition_id = partition.id;

	formData.description = description;
	formData.is_active = is_active;

	formData.departments = departments.map(el => el.department_id);
};


try {
	loading.value = true;
	additionalData.value = await DocumentRouteRepo.getAdditionalData();
} catch (e) {
	notify.fetchError(e.message);
	throw e;
} finally {
	loading.value = false;
}
</script>