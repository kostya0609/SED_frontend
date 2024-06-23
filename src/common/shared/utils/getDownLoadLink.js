export const getDownLoadLink = file_id => {

    const domain = process.env.NODE_ENV == 'production' ? `${window.location.origin}/api` : import.meta.env.VITE_HOST;

    return `${domain}/files/v1/download/${file_id}`;
}