import { inject } from "vue";

const SETTINGS = {
	CLOSE_TECHNICAL_WORK: {
		is_active: false,
		value: '',
	},
};

export const useSetting = () => {
	const { FactoryRepo } = inject('useRepo');


	const initSettings = async () => {
		(await FactoryRepo.getAll())
			.forEach(item => {
				if (item.id === 1) {
					SETTINGS.CLOSE_TECHNICAL_WORK = item;
				}
			});
	};

	return {
		SETTINGS,
		initSettings,
	};
};