import { router } from './';

/** 
 * Регистарция маршрутов
 * 
 * @type {import('@/common/shared/types').registerRoutes}
 */
export const registerRoutes = (routes, prefix = '') => {
	routes.forEach(route => {
		router.addRoute({ ...route, path: `/sed${prefix || ''}${route.path}` });
	});
};