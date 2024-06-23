/**
 * @param {number} document_id 
 * @param {Arrya<{
 * id?: number;
 * raw?: File
 * }>} files 
 * @param {string} type 
 * @returns {FormData}
 */
export const getFormDataFile = (document_id, files, type) => {

    let formData = new FormData();

    formData.append('document_id', document_id);

    for(let i = 0; i < files.length; i++){
        formData.append(`data[${type}][${i}][${files[i].id ? 'id' : 'raw'}]`, files[i].id ? files[i].id : files[i].raw);
    }

    return  formData;
}