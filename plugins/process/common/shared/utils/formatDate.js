/**
 * @param {string | number | Date} date 
 * @param {Intl.DateTimeFormatOptions} options 
 * @returns {string}
 */
export const formatDate = (date, options = {
	year: 'numeric',
	month: 'long',
	day: 'numeric',
}) => new Date(date).toLocaleString('ru', options);
