/** 
 * Регистрация модулей(подмодулей) проекта
 * 
 * @type {import('@/common/shared/types').registerModules}
 */
export const registerModules = (app, modules) => {
	modules
		.filter(item => !item.disabled)
		.forEach(({ module, params }) => app.use(module, params));
};