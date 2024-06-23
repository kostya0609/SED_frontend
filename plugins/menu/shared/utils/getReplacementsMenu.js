export const getReplacementsMenu = (menu) => {
	const replaceMenu = menu
		.filter(item => item.replaceMenu)
		.map(item => item.replaceMenu);

	const menuInner = replaceMenu
		.map(items => getReplacementsMenu(items))
		.filter(items => items.length > 0)
		.map(items => items[0]);

	return menuInner.length ? [...replaceMenu, ...menuInner] : replaceMenu;
};