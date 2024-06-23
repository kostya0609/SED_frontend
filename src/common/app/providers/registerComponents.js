/** 
 * Регистрация глобальных компонентов
 * 
 * @type {import('@/common/shared/types').registerComponents}
 */
export const registerComponents = (app, components) => {
	components
		.filter(item => !item.disabled)
		.forEach(({ name, component }) => app.component(name, component));
};