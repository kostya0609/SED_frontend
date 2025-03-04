import { ref } from "vue";

const activeRoute = ref(null);

export const useActiveRoute = () => {
	/**
	 * @param {?number} routeIndex 
	 */
    const setActiveRoute = (routeIndex) => {
        activeRoute.value = routeIndex;
    }

    return {
        activeRoute,
        setActiveRoute
    }
}