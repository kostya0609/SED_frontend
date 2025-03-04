import { BaseRepository } from "./BaseRepository";

export class ApprovalRouteRepository extends BaseRepository {

	constructor() {
		super();
		this.setModule('approval-routes');
	}

	/**
	 * @param {string} module_name 
	 * @return {Promise<any>}
	 */
	async getProcessTemplates(module_name) {
		const result = await this._query({
			nestedEndpoint: 'get-process-templates',
			payload: { module_name },
		});

		if (!result.success)
			throw new Error(result.message);


		return result.data;
	}
}