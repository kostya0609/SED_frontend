import { BaseRepository } from "@common/shared/api/BaseRepository";

export class ESZRepository extends BaseRepository {
    constructor() {
        super();
        this.setSubmodule('documents/esz');
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
        // const result = await this._query({
        //     payload,
        //     nestedEndpoint : 'get'
        // });
        // if (!result.success)
        //     throw new Error(result.message);

        // return result.data;

        return new Promise((resolve, reject) => {
            resolve({
                id: 1,
                process_template_id: 5,
                number: 'ЭСЗ-(БУХ НОТ)-2024-164551',
                type: {id: 1, title: 'ЭСЗ'},
                status: { id: 5, title: 'Создана' },
                subject: 'Какая-то тема документа',
                date_created: '2024-03-21 06:54:23',
                date_execution: '2024-03-25 06:54:23',
                foundation_document: 'какая-то ссылка на родителя если есть',
                contents: 'Некое содержание документа',
                responsible: { id: 1414, full_name: 'Иванов Иван Иванович 1', photo: 'https://bitrix.bsi.local/upload/main/590/DSCN2470.png', link: 'https://bitrix.bsi.local/company/personal/user/5458/' },
                signatory: { id: 1414, full_name: 'Иванов Иван Иванович 2', photo: 'https://bitrix.bsi.local/upload/main/590/DSCN2470.png', link: 'https://bitrix.bsi.local/company/personal/user/5458/' },
                receivers: [
                    { id: 1414, full_name: 'Иванов Иван Иванович 3', photo: 'https://bitrix.bsi.local/upload/main/590/DSCN2470.png', link: 'https://bitrix.bsi.local/company/personal/user/5458/' },
                ],
                lookers: [
                    { id: 1414, full_name: 'Иванов Иван Иванович 4', photo: 'https://bitrix.bsi.local/upload/main/590/DSCN2470.png', link: 'https://bitrix.bsi.local/company/personal/user/5458/' },
                    { id: 1414, full_name: 'Иванов Иван Иванович 5', photo: 'https://bitrix.bsi.local/upload/main/590/DSCN2470.png', link: 'https://bitrix.bsi.local/company/personal/user/5458/' },
                ],
                main_files: [
                    {
                        "original_name": "myToken.копия.моя.txt",
                        "translated_name": "mytokenkopiyamoya",
                        "hash_name": "c6dd226b479f8c4b6ed988d11ce956b1",
                        "extension": "txt",
                        "mime_type": "text/plain",
                        "size": 40,
                        "updated_at": "2024-03-22T01:01:33.000000Z",
                        "created_at": "2024-03-22T01:01:33.000000Z",
                        "id": 2,
                        "path": "/var/www/html/app/Modules/File/Files/c6dd226b479f8c4b6ed988d11ce956b1"
                    },
                    {
                        "original_name": "myToken.копия.моя.txt",
                        "translated_name": "mytokenkopiyamoya",
                        "hash_name": "c6dd226b479f8c4b6ed988d11ce956b1",
                        "extension": "txt",
                        "mime_type": "text/plain",
                        "size": 40,
                        "updated_at": "2024-03-22T01:01:33.000000Z",
                        "created_at": "2024-03-22T01:01:33.000000Z",
                        "id": 2,
                        "path": "/var/www/html/app/Modules/File/Files/c6dd226b479f8c4b6ed988d11ce956b1"
                    }
                ],
                additional_files: [
                    {
                        "original_name": "myToken.копия.моя.txt",
                        "translated_name": "mytokenkopiyamoya",
                        "hash_name": "c6dd226b479f8c4b6ed988d11ce956b1",
                        "extension": "txt",
                        "mime_type": "text/plain",
                        "size": 40,
                        "updated_at": "2024-03-22T01:01:33.000000Z",
                        "created_at": "2024-03-22T01:01:33.000000Z",
                        "id": 2,
                        "path": "/var/www/html/app/Modules/File/Files/c6dd226b479f8c4b6ed988d11ce956b1"
                    }, {
                        "original_name": "myToken.копия.моя.txt",
                        "translated_name": "mytokenkopiyamoya",
                        "hash_name": "c6dd226b479f8c4b6ed988d11ce956b1",
                        "extension": "txt",
                        "mime_type": "text/plain",
                        "size": 40,
                        "updated_at": "2024-03-22T01:01:33.000000Z",
                        "created_at": "2024-03-22T01:01:33.000000Z",
                        "id": 2,
                        "path": "/var/www/html/app/Modules/File/Files/c6dd226b479f8c4b6ed988d11ce956b1"
                    }, {
                        "original_name": "myToken.копия.моя.txt",
                        "translated_name": "mytokenkopiyamoya",
                        "hash_name": "c6dd226b479f8c4b6ed988d11ce956b1",
                        "extension": "txt",
                        "mime_type": "text/plain",
                        "size": 40,
                        "updated_at": "2024-03-22T01:01:33.000000Z",
                        "created_at": "2024-03-22T01:01:33.000000Z",
                        "id": 2,
                        "path": "/var/www/html/app/Modules/File/Files/c6dd226b479f8c4b6ed988d11ce956b1"
                    }
                ],
                description_files: 'Описание файлов портфеле',

                full_access: true,
            })
        })
    }
}