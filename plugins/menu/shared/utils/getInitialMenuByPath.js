export const getInitialMenuByPath = (allMenu, path) => allMenu.find(menu => {
	if (menu.find(item => item.path === path)) {
		return true;
	}

	return false;
});