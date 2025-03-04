/**
 * @param {import('vue-router').RouteLocationNormalizedLoaded} route 
 */
export const getNormalizedRoutePath = (route) => {
	const lastMatchedRoute = route.matched.at(-1);
	const result = lastMatchedRoute ? lastMatchedRoute.path : route.path;

	/** Регулярка для обрезания параметров запроса, чтобы оставался только чистый путь до страницы */
	return result.replace(/\/:.*/, '');
};