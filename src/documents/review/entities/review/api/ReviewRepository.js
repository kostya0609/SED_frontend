import { BaseRepository } from "@common/shared/api/BaseRepository";

export class ReviewRepository extends BaseRepository {
    constructor() {
        super();
        this.setSubmodule('documents/review');
        this.setEndpoint('reviews');
    }

    /**
     * @param {string} nestedEndpoint
     * @returns {module:url.URL}
     */
    _buildUrl(nestedEndpoint) {
        return new URL(`${this._url}/${this._endpoint}/${this._version}` + (nestedEndpoint ? `/${nestedEndpoint}` : ''));
    }


    /**
     * @param {{document_id: number}} payload
     * @return {Promise<any>}
     */
    async getById(payload) {
        const result = await this._query({
            payload,
            nestedEndpoint: 'get'
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
     *  theme_id: number,
     *  content: string,
     *  initiator_id: number,
     *  receivers: number[]
     * }} payload
     * @return {Promise<any>}
     */
    async create(payload) {
        const result = await this._query({
            payload,
            nestedEndpoint: 'create'
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
     * id: number,
     *  theme_id: number,
     *  content: string,
     *  initiator_id: number,
     *  receivers: number[]
     * }} payload
     * @return {Promise<any>}
     */
    async update(payload) {
        const result = await this._query({
            payload,
            nestedEndpoint: 'update'
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
      * @param {{document_id: number}} payload
      * @return {Promise<any>}
      */
    async delete(payload) {
        const result = await this._query({
            payload,
            nestedEndpoint: 'delete'
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
      * @param {{document_id: number}} payload
      * @return {Promise<any>}
      */
        async cancel(payload) {
            const result = await this._query({
                payload,
                nestedEndpoint: 'cancel'
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
      * @param {FormData} payload
      * @return {Promise<any>}
      */
    async uploadFiles(payload) {
        const result = await this._query({
            payload,
            nestedEndpoint: 'upload-files',
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
	 * @param {number} documentId 
	 * @returns {Promise<void>}
	 */
	async sendToApproval(documentId) {
		const result = await this._query({
			payload: { document_id: documentId },
			nestedEndpoint: 'send-to-approval',
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