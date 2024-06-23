import { includesArray } from './'

export const prepareMenu = (menu, userRights) => menu.filter(({ rights }) => {
	if (!rights) {
		return true;
	}

	return includesArray(rights, userRights);
});