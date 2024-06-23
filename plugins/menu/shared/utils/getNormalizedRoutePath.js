/**
 * @param {import('vue-router').RouteLocationNormalizedLoaded} route 
 */
export const getNormalizedRoutePath = (route) => {
	const lastMatchedRoute = route.matched.at(-1);
	return lastMatchedRoute ? lastMatchedRoute.path : route.path;
};