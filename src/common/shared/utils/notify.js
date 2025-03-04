import { ElNotification } from "element-plus";

export const notify = new class {
	success(title, message = '') {
		return this.#notify(title, message, 'success', 2000);
	}

	successLeft(title, message = '') {
		return ElNotification({
			title,
			message,
			type: 'success',
			duration: 3000,
			position: 'top-left',
		});
	}

	warning(title, message = '') {
		return this.#notify(title, message, 'warning', 5000);
	}

	info(title, message = '') {
		return this.#notify(title, message, 'info');
	}

	error(title, message = '') {
		return this.#notify(title, message, 'error', 5000);
	}

	fetchError(message = '') {
		return this.error('Произошла ошибка при выполнении запроса!', message);
	}

	#notify(title, message, type, duration = undefined) {
		return ElNotification({
			title,
			message,
			type,
			duration,
		});
	}
}
