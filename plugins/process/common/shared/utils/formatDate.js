/**
 * @param {string | number | Date} date 
 * @param {Intl.DateTimeFormatOptions} options 
 * @returns {string}
 */
export const formatDate = (date, options = {}) => new Date(date).toLocaleString('ru-RU', {
	year: 'numeric',
	month: 'long',
	day: 'numeric',
	hour12: false,
	...options,
});
