import restful, { fetchBackend } from 'restful.js';

let _apiBase = null;

export default class Base {
  static set apiBase(value) {
    if (_apiBase !== value) {
      this._client = this._createClient(value);
    }
    _apiBase = value;
  }

  static get apiBase() {
    return _apiBase;
  }

  static get client() {
    return this._client;
  }

  static get path() {
    throw new Error('path accessor is not yet implmented.');
  }

  static all() {
    return this.client.all(this.path);
  }

  static one(id) {
    return this.client.one(this.path, id);
  }

  static fetchAll(params, headers) {
    return this.all().getAll(params, headers);
  }

  static create(data) {
    return this.all().post(data);
  }

  static save(id, data) {
    return this.one(id).patch(data);
  }

  static delete(id) {
    return this.one(id).delete();
  }

  static _createClient(apiBase) {
    const client = restful(apiBase.replace(/\/$/, ''), fetchBackend(global.fetch));
    client.on('error', error => {
      const { statusCode } = error.response;
      if (statusCode && statusCode.toString()[0] === '5') {
        console.error(error);
      }
    });
    return client;
  }
}
