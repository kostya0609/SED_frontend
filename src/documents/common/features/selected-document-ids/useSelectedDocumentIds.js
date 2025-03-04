import { useCookies } from '@vueuse/integrations/useCookies';

const cookies = useCookies();

/** 
 * @param {number} documentId 
 */
export const setDocumentId = (documentId) => {
	const commonDocumentId = documentId;
	const documentIds = cookies.get('selected_document_ids') || [];

	if (!documentIds.includes(commonDocumentId)) {
		documentIds.push(commonDocumentId);
	}

	cookies.set('selected_document_ids', documentIds, {
		httpOnly: false,
		path: '/',
		expires: new Date(new Date().getTime() + 60 * 60 * 1000), // 1 hour
	});
}