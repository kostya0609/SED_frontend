<template>
	<RouterView v-slot="{ Component }">
		<template v-if="Component">
			<Suspense :timeout="0">
				<template #default>
					<div class="main-content">
						<component :is="Component" />
					</div>
				</template>
				<template #fallback>
					<div>
						<Preloader
							:loading="true"
							class="page-preloader"
							v-if="!errorMessage"
						/>
						<el-result
							icon="error"
							title="Произошла ошибка!"
							:sub-title="errorMessage"
							v-else
						>
							<template #extra>
								<el-button
									type="primary"
									@click="goToHome"
									icon="House"
								>
									На главную
								</el-button>
							</template>
						</el-result>
					</div>
				</template>
			</Suspense>
		</template>
		<template v-if="loading">
			<Preloader
				:loading="true"
				class="page-preloader"
			/>
		</template>
	</RouterView>
</template>

<script setup>
import { RouterView, useRouter } from 'vue-router';
import { Preloader } from '@/common/shared/ui';
import { onErrorCaptured, ref } from 'vue';
import { DOCUMENT_lIST_KEY } from '@/documents/common/shared/symbols';
import { ApiError } from '@/common/shared/errors/ApiError';

const router = useRouter();
const loading = ref(false);
const errorMessage = ref(null);

router.beforeEach(() => {
	loading.value = true;
});

router.afterEach(() => {
	loading.value = false;
});


/**
 * Обработчик перехвата ошибок в приложении.
 * 
 * Этот код использует хук Vue `onErrorCaptured` для глобальной обработки ошибок.
 * Он специально обрабатывает ошибки типа ApiError, которые содержат свойство `exception`.
 * 
 * Функциональность:
 * 1. Определяет регулярное выражение для проверки типов исключений 
 *    (AccessDeniedException или NotFoundException).
 * 2. Проверяет, является ли ошибка экземпляром ApiError и имеет ли свойство exception.
 * 3. Если тип исключения соответствует регулярному выражению:
 *    - Логирует ошибку в консоль с дополнительной информацией.
 *    - Перенаправляет пользователя на страницу списка документов
 *    - Предотвращает дальнейшее распространение ошибки.
 * 
 * @param {Error|ApiError} err - Перехваченная ошибка
 * @param {Object} instance - Экземпляр компонента Vue, в котором произошла ошибка
 * @param {string} info - Информация о контексте, в котором произошла ошибка
 * @returns {boolean} false, если ошибка обработана; true - если нет
 */
onErrorCaptured((err, instance, info) => {
	const exceptionRegex = /(AccessDeniedException|NotFoundException)$/;
	errorMessage.value = err.message;

	if (err instanceof ApiError && err.exception) {
		if (exceptionRegex.test(err.exception)) {
			console.error('API Error:', err.exception, 'Component:', instance, 'Info:', info);
			router.replace({ name: DOCUMENT_lIST_KEY });
			return false;
		}
	}
});

const goToHome = () => {
	location.href = '/sed';
};
</script>
