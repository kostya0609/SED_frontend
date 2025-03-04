<template>
	<el-button
		type="default"
		@click="handleClick"
		:loading="loading"
	>
		{{ isShowList ? 'Скрыть список' : 'Где используется роль?' }}
	</el-button>
</template>
<script setup>
import { inject, ref } from 'vue';
import { DOCUMENTS_KEY } from '@/plugins/roles/shared/symbols';
import { notify } from '@/plugins/roles/shared/utils';

const documentSettings = inject(DOCUMENTS_KEY);

const loading = ref(false);
const isShowList = ref(false);

const props = defineProps({
	roleId: {
		type: Number,
		required: true,
	},
	roleType: {
		type: String,
		required: true,
		validate: (value) => ['static', 'dynamic'].includes(value),
	}
});

const emit = defineEmits(['change']);

const handleClick = async () => {
	if (isShowList.value) {
		isShowList.value = false;
		emit('change', null);
		return;
	}

	try {
		loading.value = true;

		let rawDocuments = [];

		if (props.roleType === 'dynamic') {
			rawDocuments = await documentSettings.getDocumentsByDynamicRole(props.roleId);
		} else if (props.roleType === 'static') {
			rawDocuments = await documentSettings.getDocumentsByStaticRole(props.roleId);
		} else {
			throw new Error(`Invalid roleType: ${props.roleType}`);
		}

		const documents = documentSettings.transform(rawDocuments);

		isShowList.value = true;
		emit('change', documents);
	} catch (error) {
		notify.fetchError(error.message);
	} finally {
		loading.value = false;
	}
};
</script>