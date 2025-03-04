<template>
	<Preloader :loading="loading">
		<h3 class="header_h3">Информация по динамической роли c ID - {{ route.params.id }}</h3>
		<el-table
			:data="tableData"
			stripe
			:show-header="false"
			border
		>
			<el-table-column prop="name" />
			<el-table-column prop="value" />
		</el-table>

		<CheckRole
			v-if="role.can_check"
			@setLoading="setLoading"
		/>
		<el-alert
			type="warning"
			show-icon
			:closable="false"
			class="mt-3"
			title="Данная роль не может быть проверена"
			v-else
		/>

		<el-space class="mt-3">
			<ChangeDataButton />
			<CheckDocumentsButton
				:role-id="role.id"
				role-type="dynamic"
				@change="handleChangeCheckDocuments"
				v-if="documentSettings"
			/>
		</el-space>

		<CheckDocumentList
			class="mt-3"
			:documents="documents"
			v-if="documentSettings"
		/>
	</Preloader>
</template>

<script setup>
import { ref, inject, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Preloader } from '@/plugins/roles/shared/ui';
import { notify } from "@/plugins/roles/shared/utils";
import { DOCUMENTS_KEY, USE_ACTION_BUTTONS_KEY } from '@/plugins/roles/shared/symbols';
import { useDynamicRoleRepo } from '@/plugins/roles/entities/dynamic-role/api';
import { ChangeDataButton } from '@/plugins/roles/features/dynamic-role/change-data';
import { CheckRole } from '@/plugins/roles/features/dynamic-role/check-role';
import { CheckDocumentsButton, CheckDocumentList } from '@/plugins/roles/features/check-documents';

const useActionButtons = inject(USE_ACTION_BUTTONS_KEY);
const documentSettings = inject(DOCUMENTS_KEY);

const DynamicRoleRepo = useDynamicRoleRepo();

const route = useRoute();
const router = useRouter();
const loading = ref(false);
const tableData = ref([]);
const role = ref(null);
const documents = ref(null);

const setLoading = (value) => {
	loading.value = value;
}

const getRole = async (id) => {
	try {
		loading.value = true;
		const result = await DynamicRoleRepo.getById({ id });
		role.value = result;

		tableData.value.push({ name: 'Наименование роли:', value: result.title ?? 'нет данных' });
		tableData.value.push({ name: 'Активность:', value: result.is_active ? 'Да' : 'Нет' });
		tableData.value.push({ name: 'Описание логики работы роли:', value: result.description ?? 'нет данных' });
	} catch (e) {
		notify.fetchError(e.message);
		throw e;
	} finally {
		loading.value = false;
	}
}

const handleChangeCheckDocuments = async (docs) => {
	documents.value = docs;
};

await getRole(route.params.id);

const { addButton, clearButtons } = useActionButtons();

onMounted(() => {
	addButton({
		title: 'ВЕРНУТЬСЯ НАЗАД',
		onClick: () => {
			router.push({ path: `/sed/admin/roles/dynamics` });
		}
	});
});

onUnmounted(() => {
	clearButtons();
});

</script>