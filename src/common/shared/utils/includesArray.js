/**
* @param {any[]} list массив, в котором ищем значения search
* @param {any[]} search массив значений, которые будем искать в list
*/
export const includesArray = (list, search) => {
	for (const value of search) {
		if (list.includes(value)) {
			return true;
		}
	}

	return false;
};