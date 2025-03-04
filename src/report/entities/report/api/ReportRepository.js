import { BaseRepository } from "@/common/shared/api";

export class ReportRepository extends BaseRepository {
	constructor() {
		super();
		this
			.setSubmodule('sed')
			.setSubmodule('report')
			.setEndpoint('reports');
	}

	/**
	 * 
	 * @returns {Promise<object[]>}
	 */
	async getAll(payload) {
		const result = await this._query({
			nestedEndpoint: 'list',
			payload,
		});

		if (!result.success) {
			if (result.errors) {
				throw new Error(Object.values(result.errors).join('\n'));
			}

			throw new Error(result.message);
		}

		return result.data;
	}

	async generateExcelReport() {
		const result = await this._query({
			nestedEndpoint: 'generate-excel',
			payload: {},
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