import { ref } from "vue";

const showStatuses = ref(true);
const showButtonsOnPreparation = ref(true);
const columnOnPreparation = ref(false);
const showHead = ref(true);

export const useProcessSettings = () => {
	const initSettings = (props) => {
		showStatuses.value = props.showStatuses;
		showButtonsOnPreparation.value = props.showButtonsOnPreparation;
		columnOnPreparation.value = props.columnOnPreparation;
		showHead.value = props.showHead;
	}

	return {
		initSettings,
		showStatuses,
		showButtonsOnPreparation,
		columnOnPreparation,
		showHead,
	};
};