import { PROCESS_STATUS } from '@/plugins/process/common';

/**
 * @typedef {object} User
 * @property {number} User.id
 * @property {string} User.full_name
 * @property {string} User.photo
 * @property {string} User.link
 */
export class Process {
	/**
	 * @type {number}
	 */
	id;

	/**
	 * @type {string}
	 */
	title;

	/**
	 * @type {string}
	 */
	module_name;

	/**
	 * @type {number}
	 */
	restart_count;

	/**
	 * @type {string}
	 */
	created_at;

	/**
	 * @type {string}
	 */
	updated_at;

	/**
	 * @type {number}
	 */
	document_id;

	/**
	 * Инициатор документа
	 * @type {User}
	 */
	document_user;

	/**
	 * Идентификатор инициатора документа
	 * @type {number}
	 */
	document_user_id;

	/**
	 * Время запуска процесса
	 * @type {string}
	 */
	executed_at;

	/**
	 * @type {any[]}
	 */
	stages;

	/**
	 * @type {any}
	 */
	status;

	/**
	 * @type {any[]}
	 */
	statuses;

	/**
	 * @type {number}
	 */
	template_id;

	/**
	 * Инициатор процесса
	 * @type {User}
	 */
	user;

	/**
	 * Идентификатор инициатора процесса
	 * @type {number}
	 */
	user_id;

	/**
	 * Идентификатор маршрута согласования
	 * @type {number}
	 */
	approval_route_id;

	constructor(process) {
		Object
			.entries(process)
			.forEach(([key, value]) => this[key] = value);
	}

	isPreparation() {
		return this.status.id === PROCESS_STATUS.PREPARATION;
	}

	isDone() {
		return this.status.id === PROCESS_STATUS.DONE;
	}

	isRunned() {
		return !([PROCESS_STATUS.DONE, PROCESS_STATUS.PREPARATION].includes(this.status.id));
	}

}