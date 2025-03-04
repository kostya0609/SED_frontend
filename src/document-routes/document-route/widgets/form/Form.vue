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
							:key="showDepartmentsTree"
							:disabled="false"
							v-model="formData.departments"
							@loading="(state) => loading = state"
						/>
					</el-form-item>
				</el-col>
			</el-row>

			<div>
				<el-button
					type="primary"
					@click="save"
				>
					Сохранить
				</el-button>

				<el-button
					type="primary"
					@click="saveAndClose"
					v-if="mode === 'edit'"
				>
					Сохранить и закрыть
				</el-button>

				<el-button
					type="primary"
					@click="saveAndCreate"
					v-if="mode === 'create'"
				>
					Сохранить и создать
				</el-button>
			</div>
		</el-form>

	</Preloader>
</template>

<script setup>

import { ref, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { DocumentRouteRepo } from '@document-routes/document-route/entities/document-route';
import { PartitionRepo } from '@document-routes/document-route/entities/partition';
import { Preloader } from '@common/shared/ui';
import MainFiels from './MainFields.vue';

import { notify } from '@common/shared/utils';
import { DepartmentTree } from '../department-tree';

const showDepartmentsTree = ref(1);

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
const route = useRoute();

const additionalData = ref();

const formData = reactive({
	id: null,
	title: null,
	partition_id: null,
	partition: {
		id: null,
		title: '',
	},
	description: null,
	is_active: true,
	departments: [],
});

const rules = reactive({
	title: { required: true, message: 'Необходимо ввести название маршрута' },
	partition_id: { required: true, message: 'Необходимо выбрать раздел маршрута' },
	description: { required: false, message: 'Необходимо ввести описание маршрута' },
	departments: { required: true, message: 'Необходимо выбрать департаменты, которым будет доступен этот маршрута' },
});

const submit = async (callback = () => { }) =>
	form.value.validate(async (isValid) => {
		if (!isValid) return null;

		try {
			let result = null;
			loading.value = true;

			if (props.mode === 'create') {
				result = await DocumentRouteRepo.create(formData);
			} else {
				result = await DocumentRouteRepo.edit(formData);
			}

			await callback(result);
		} catch (e) {
			notify.fetchError(e.message);
			throw e;
		} finally {
			loading.value = false;
		}

	});

const save = async () => {
	await submit((result) => {
		// Выходим, если валидация не прошла
		if (!result) {
			return;
		}

		if (props.mode === 'create') {
			router.replace({ name: 'detailDocumentRoutePage', params: { id: result.id } });
		}
	});
};

const saveAndClose = async () => {
	await submit((result) => {
		result && router.replace({ name: 'detailDocumentRoutePage', params: { id: result.id } });
	});
};

const saveAndCreate = async () => {
	await submit((result) => {
		if (!result) {
			return;
		}

		if (props.mode === 'create') {
			form.value.resetFields();
			formData.partition = {
				id: null,
				title: null,
			};
			formData.partition_id = null;
			formData.departments = [];
			showDepartmentsTree.value++;
		} else {
			router.replace({ name: 'detailDocumentRoutePage', params: { id: result.id } });
		}
	});
};

if (props.mode === 'create' && route.params.partition_id) {
	try {
		loading.value = true;
		let result = await PartitionRepo.get({ id: route.params.partition_id });
		formData.partition_id = route.params.partition_id;
		formData.partition.id = route.params.partition_id;
		formData.partition.title = result.title;
	} catch (e) {
		notify.fetchError(e.message);
		throw e;
	} finally {
		loading.value = false;
	}
}

if (props.mode === 'edit') {

	const {
		id,
		title,
		partition,
		description,
		is_active,
		departments,
	} = props.data;

	formData.id = id;
	formData.title = title;

	if (partition) {
		formData.partition = partition;
	}

	formData.partition_id = partition ? partition.id : null;

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