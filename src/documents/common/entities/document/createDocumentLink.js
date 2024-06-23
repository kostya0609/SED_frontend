import { DOCUMENT_TYPE } from '@documents/common/shared/constants';

/**
 * 
 * @param {number} documentTypeId 
 * @param {'create'|'detail'|'edit'} operation 
 * @param {number} documentId 
 * @returns {string}
 */
export const createDocumentLink = (documentTypeId, operation, documentId = null) => {
	if (['detail', 'edit'].includes(operation) && !documentId) throw new Error('Необходимо указать id документа');

	const documentIdParam = !documentId ? '' : `/${documentId}`;
	let link = '';

	switch (documentTypeId) {
		case DOCUMENT_TYPE.ESZ:
			link = `/sed/documents/esz/${operation}${documentIdParam}`;
			break;

		case DOCUMENT_TYPE.DIRECTIVE:
			link = `/sed/documents/directive/${operation}${documentIdParam}`;
			break;

		case DOCUMENT_TYPE.REVIEW:
			link = `/sed/documents/review/${operation}${documentIdParam}`;
			break;

		default:
			throw new Error(`Нет обрабоки для типа документа с id ${documentTypeId}`);
	}

	return link;
}
