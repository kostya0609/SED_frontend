
export default async function (domain, url, data, type, downloadRequest) {
  let body, header = {};

  if (type === 'file') {
    window._token ? data.append('token', window._token) : '';
    window._userId ? data.append('user_id', window._userId) : '';
    body = data;

  } else {
    window._token ? data.token = window._token : '';
    window._userId ? data.user_id = window._userId : '';
    body = { ...data };
    header['Content-Type'] = 'application/json;charset=utf-8';
  }

  return fetch(
    domain + url,
    {
      method: 'post',
      headers: header,
      body: type === 'file' ? body : JSON.stringify(body, function (key, val) {
        return (typeof val === 'function') ? '' + val : val;
      })
    }
  ).then(res => {
    return new Promise((resolve, reject) => {
      if (!res.ok)
        throw new Error('Response server - status code ' + res.status);
      else {

        if (downloadRequest) {
          resolve(res)
        } else {
          res.json().then(json => {
            resolve(json)
          }).catch(err => {
            reject(err);
          })
        }

      }
    })
  }).catch(err => {
    return new Promise((resolve, reject) => {
      reject({ status: 'error', message: 'Некорректный ответ сервера', system: err.message })
    })
  });
};
