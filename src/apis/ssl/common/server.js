import * as rootServer from '../../rootServer';

export const prefixApiSSL = "/freecert/api/v1";

export const get = (path, params = null) => {
  return rootServer.get(prefixApiSSL + path, params);
}

export const post = (path, params = null) => {
  return rootServer.post(prefixApiSSL + path, params);
}

export const postFormData = (path, data = null) => {
  var formData = new FormData();
  for (let key in data) {
    formData.append( key, data[key]);
  }
  return rootServer.post(prefixApiSSL + path, formData);
}

export const put = (path, params = null) => {
  return rootServer.put(prefixApiSSL + path, params);
}

export const destroy = (path, data) => {
  return rootServer.destroy(prefixApiSSL + path, data);
}

export const downloadFile = (path, params) => {
  return rootServer.downloadFile(prefixApiSSL + path, params, 'arraybuffer');
}
