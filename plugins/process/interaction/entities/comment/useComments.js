import { inject, ref } from "vue";

const comments = ref([]);

export const useComments = () => {
	const { InteractionCommentRepo } = inject('useRepo');

	/**
	 * @param {string} module_name 
	 * @param {number} document_id 
	 * 
	 * @returns {import('vue').Ref<any[]>}
	 */
	const initComments = async (document_id, template_id, user_id) => {
		const result = await InteractionCommentRepo.getComments({
			document_id,
			template_id,
			user_id,
		});

		comments.value = result;
		return comments;
	};

	/**
	 * @param {object} payload
	 * @param {number} payload.process_id
	 * @param {number} payload.action_id
	 * @param {number} payload.user_id
	 * @param {number} payload.comment_parent_id
	 * @param {string} payload.comment_content
	 * @param {object} payload.document
	 *
	 * @returns {import('vue').Ref<any[]>}
	 */
	const replyToComment = async ({ process_id, action_id, user_id, comment_parent_id, comment_content, document }) => {
		const result = await InteractionCommentRepo.decide({
			process_id,
			action_id,
			user_id,
			comment_parent_id,
			comment_content,
			document,
		});

		comments.value = result;
		return comments;
	};

	return {
		comments,
		initComments,
		replyToComment,
	};
};