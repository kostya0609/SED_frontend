import { inject } from "vue";

const SETTINGS = {
	CLOSE_TECHNICAL_WORK: {
		is_active: false,
		value: '',
	},
};

export const useSetting = () => {
	const initSettings = async () => {
		const { FactoryRepo } = inject('useRepo');

		const settings = await FactoryRepo.getAll();

		settings
			.forEach(item => {
				switch (item.id) {
					case 1:
						SETTINGS.CLOSE_TECHNICAL_WORK = item;
						break;
				}
			});
	};

	return {
		SETTINGS,
		initSettings,
	};
};