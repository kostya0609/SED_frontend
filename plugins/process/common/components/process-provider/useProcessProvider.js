import { ref } from "vue";

const executorId = ref(null);
const userId = ref(null);
const documentId = ref(null);
const templateId = ref(null);
const access = ref(null);
const document = ref(null);
const moduleName = ref(null);
const isDebug = ref(false);
const showCompletedProcesses = ref(false);

export const useProcessProvider = () => {
	const initProvider = (props) => {
		executorId.value = props.executorId;
		userId.value = props.userId;
		documentId.value = props.document.id;
		templateId.value = props.templateId;
		access.value = props.access;
		document.value = props.document;
		moduleName.value = props.moduleName;
		isDebug.value = props.isDebug;
		showCompletedProcesses.value = props.showCompletedProcesses;
	};

	return {
		executorId,
		userId,
		documentId,
		templateId,
		access,
		document,
		moduleName,
		isDebug,
		showCompletedProcesses,
		initProvider,
	};
};