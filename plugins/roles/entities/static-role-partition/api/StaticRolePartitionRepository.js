import { BaseRepository } from "@/plugins/roles/shared/api/BaseRepository";

export class StaticRolePartitionRepository extends BaseRepository {
	constructor() {
        super();
        this.setModule('roles');
    }    
	
    /**
  	* @return {Promise<any>}
	*/
	async getAll() {
		const result = await this._query({
            nestedEndpoint : 'static-partitions/get-all'
        });
        if (!result.success)
            throw new Error(result.message);

        return result.data;
	}

     /**
  	* @return {Promise<any>}
	*/
	async getTree() {
		const result = await this._query({
            nestedEndpoint : 'static-partitions/get-tree'
        });
        if (!result.success)
            throw new Error(result.message);

        return result.data;
	}

    /**
	 * @param {{id: number}} payload
	 * @return {Promise<any>}
	 */
	async getBreadcrumbs(payload) {
		const result = await this._query({
			payload,
			nestedEndpoint: 'static-partitions/get-breadcrumbs',
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
    * @param {{
	*  parent_id: number;
	* }} payload
	* @return {Promise<any>}
	*/
	async create(payload) {
		const result = await this._query({
            payload,
            nestedEndpoint : 'static-partitions/create'
        });
        if (!result.success)
            throw new Error(result.message);

        return result.data;
	}

    /**
    * @param {{
	*  parent_id: number;
	* }} payload
	* @return {Promise<any>}
	*/
	async edit(payload) {
		const result = await this._query({
            payload,
            nestedEndpoint : 'static-partitions/edit'
        });
        if (!result.success)
            throw new Error(result.message);

        return result.data;
	}

    /**
    * @param {{
	*  parent_id: number;
	* }} payload
	* @return {Promise<any>}
	*/
	async delete(payload) {
		const result = await this._query({
            payload,
            nestedEndpoint : 'static-partitions/delete'
        });
        if (!result.success)
            throw new Error(result.message);

        return result.data;
	}
}