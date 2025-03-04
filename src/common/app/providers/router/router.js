import { routes } from '@/common/pages';
import { DOCUMENT_lIST_KEY } from '@/documents/common/shared/symbols';
import { createRouter, createWebHistory } from 'vue-router';

export const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

/**
 * Данный код необходим для перехода на главную страницу, когда не находим маршрут, по которому перешли.
 * Решает проблему битрикса, когда он при переходе из админки и в др. случаях подставляет /index.php
 */
router.beforeEach((to, from, next) => {
	if (!to.matched.length) {
		router.push({ name: DOCUMENT_lIST_KEY });
		return;
	}

	next();
});