import { BaseRepository } from "./BaseRepository";

export class ApprovalRouteRepository extends BaseRepository {
	constructor() {
		super();
		this
			.setModule('approval-routes')
			.setVersion('v1');
	}

	/**
	 * @param {number} approval_route_id 
	 * @param {number} process_id 
	 * @returns {Promise<any>}
	 */
	async apply(approval_route_id, process_id) {
		const result = await this._query({
			payload: {
				approval_route_id,
				process_id,
			},
			nestedEndpoint: 'apply',
		});

		if (!result.success) {
			if (result.errors) {
				throw new Error(Object.values(result.errors).join('\n'));
			}

			throw new Error(result.message);
		}

		return result.data;
	}
}