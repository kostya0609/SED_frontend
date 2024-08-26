export const DOCUMENT_STATUS = {
	/**
	 * Подготовка, на подготовке
	 * @type {number}
	 */
	PREPARATION: 1,

	/**
	 * Устранение замечаний
	 * @type {number}
	 */
	FIX: 2,

	/**
	 * Согласование
	 * @type {number}
	 */
	COORDINATION: 3,

	/**
	 * Устранение замечаний после подписания
	 * @type {number}
	 */
	FIX_SIGNING: 4,

	/**
	 * Подписание
	 * @type {number}
	 */
	SIGNING: 5,

	/**
	 * Устранение замечаний на резолюции
	 * @type {number}
	 */
	FIX_RESOLUTION: 6,

	/**
	 * Наложение резолюции
	 * @type {number}
	 */
	RESOLUTION: 7,

	/**
	 * Архив отработанно
	 * @type {number}
	 */
	ARCHIVE_WORKED: 8,

	/**
	 * Архив аннулированно
	 * @type {number}
	 */
	ARCHIVE_CANCELLED: 9
};