export const getDownloadLink = fileId => process.env.NODE_ENV == 'production' ?
	`${window.location.origin}/api/files/v1/download/${fileId}` :
	`http://${window.location.hostname}/files/v1/download/${fileId}`;