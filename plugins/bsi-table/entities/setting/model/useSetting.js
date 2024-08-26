export const useSetting = () => {
	const settings = {
		sort: null,
		filter: null,
		paginate: {
			page: 1,
			perPage: 10,
		},
		search: null,
	};

	const settingsMerge = (state) => {
		if (!state) {
			return settings;
		}

		if (state.sort) {
			settings.sort = state.sort;
		}

		if (state.filter) {
			settings.filter = state.filter;
		}

		if (state.paginate) {
			settings.paginate = {
				...settings.paginate,
				...state.paginate,
			};
		}

		if ('search' in state) {
			settings.search = state.search;
		}

		if (state.columns) {
			settings.columns = state.columns;
		}

		return settings;
	};

	const getSettings = () => settings;

	return {
		settingsMerge,
		getSettings,
	};
};