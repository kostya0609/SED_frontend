import { routes } from '../pages';

/**
 * @type {import('@/common/shared/types').Module}
 */
export default {
	install(app, { registerRoutes }) {
		registerRoutes(routes);
	}
};