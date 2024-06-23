/** 
 * Регистрация плагинов
 * 
 * @type {import('@/common/shared/types').registerPlugins}
 */
export const registerPlugins = (app, plugins) => {
	plugins
		.filter(item => !item.disabled)
		.forEach(({ plugin, params }) => app.use(plugin, params));
};