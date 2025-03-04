import { useStorage } from '@vueuse/core'

const activeRoute = useStorage('sed-document-routes-active-route', '/sed/admin/document-routes/list-v2/', localStorage);

export const useActiveRoute = () => {

	const setActiveRoute = (route) => {
		activeRoute.value = route;
	}

	return {
		activeRoute,
		setActiveRoute,
	}
}