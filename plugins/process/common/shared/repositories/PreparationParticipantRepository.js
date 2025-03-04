import { BaseRepository } from "./BaseRepository";

export class PreparationParticipantRepository extends BaseRepository {
	constructor() {
		super();
		this
			.setModule('processes')
			.setSubmodule('public')
			.setEndpoint('processes/preparation-participants');
	}

	/**
	 * @param {Object} payload
	 * @return Promise<any>
	 */
	async attach(payload) {
		const result = await this._query({
			payload,
			nestedEndpoint: 'attach',
		});

		if (!result.success) {
			if (result.errors) {
				throw new Error(Object.values(result.errors).join('\n'));
			}

			throw new Error(result.message);
		}

		return result.data;
	}

	/**
	 * @param {Object} payload
	 * @return Promise<any>
	 */
	async detach(payload) {
		const result = await this._query({
			payload,
			nestedEndpoint: 'detach',
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
