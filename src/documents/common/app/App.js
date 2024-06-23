import { routes } from '@documents/common/pages';

/**
 * @type {import('@/common/shared/types').Module}
 */
export default {
	install(app, { registerRoutes }) {
		registerRoutes(routes);
	}
};