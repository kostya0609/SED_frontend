import { BaseRepository } from "./BaseRepository";

export class InitialRepository extends BaseRepository {
	async getInitialData({ user_id }) {
		const result = await this._query({
			payload: { user_id },
			nestedEndpoint: 'init',
		});

		if (!result.success)
			throw new Error(result.errors ? Object.values(result.errors) : result.message);

		return result.data;
	}
}