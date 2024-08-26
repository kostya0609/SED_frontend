export function getFormDataFileList(document_id) {
	const formData = new FormData();
	formData.append('document_id', document_id);

	function append(files, type) {
		if (!files.length) {
			formData.append(`data[${type}]`, '');
		}

		for (let i = 0; i < files.length; i++) {
			formData.append(`data[${type}][${i}][${files[i].id ? 'id' : 'raw'}]`, files[i].id ? files[i].id : files[i].raw);
		}

		return this;
	};

	const get = () => formData;

	return {
		append,
		get
	};
}