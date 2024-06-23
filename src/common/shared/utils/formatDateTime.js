/**
 * @param {string | number | Date} date
 * @param {Intl.DateTimeFormatOptions} options
 * @returns {string}
 */
export const formatDateTime = (date, options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
}) => new Date(date).toLocaleString('ru', options);
