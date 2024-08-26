import { DOCUMENT_TEMPLATE_TYPE } from '@document-routes/common/shared/constants';

/**
 * 
 * @param {number} documentTemplateTypeId 
 * @param {'create'|'detail'|'edit'} operation 
 * @param {number} documentTemplateId 
 * @returns {string}
 */
export const createDocumentTemplateLink = (documentTemplateTypeId, operation, documentTemplateId = null, documentRouteId = null) => {

	if (['detail', 'edit'].includes(operation) && !documentTemplateId) throw new Error('Необходимо указать id шаблона документа');
	if (operation == 'create' && !documentRouteId) throw new Error('Необходимо указать id маршрута документа');

	const documentTemplateIdParam = !documentTemplateId ? `/${documentTemplateTypeId}/${documentRouteId}` : `/${documentTemplateId}`;

	let link = '';

	switch (documentTemplateTypeId) {
		case DOCUMENT_TEMPLATE_TYPE.ESZ:
			link = `/sed/admin/document-routes/document-template/${operation}${documentTemplateIdParam}`;
			break;

		case DOCUMENT_TEMPLATE_TYPE.DIRECTIVE:
			link = `/sed/admin/document-routes/document-template/${operation}${documentTemplateIdParam}`;
			break;

		case DOCUMENT_TEMPLATE_TYPE.REVIEW:
			link = `/sed/admin/document-routes/document-template/${operation}${documentTemplateIdParam}`;
			break;

		default:
			throw new Error(`Нет обрабоки для типа шаблона документа с id ${documentTemplateTypeId}`);
	}

	return link;
}
