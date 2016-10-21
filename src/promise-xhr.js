class PromiseXHR {
  constructor() {
    this.event = null;
    this.withCredentials = false;

    this.delete = this.delete.bind(this);
    this.get = this.get.bind(this);
    this.post = this.post.bind(this);
    this.put = this.put.bind(this);
    this.send = this.send.bind(this);
    this.then = this.then.bind(this);
  }

  get withCredentials() {
    return this.withCredentials;
  }

  set withCredentials(withCredentials) {
    this.withCredentials = withCredentials;
  }

  delete(url, data) {
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', url, true);
    xhr.withCredentials = this.withCredentials;

    xhr.addEventListener('progress', event => this.event = event);
    xhr.addEventListener('readystatechange', event => this.event = event);

    xhr.send(data);

    return this;
  }

  /**
   * @param {String} url - url
   * @param {[]} [params] -
   *  [
   *    {
   *      key: {String || number} value
   *    }
   *  ]
   */
  get(url, params) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.withCredentials = this.withCredentials;

    xhr.addEventListener('progress', event => this.event = event);
    xhr.addEventListener('readystatechange', event => this.event = event);

    xhr.send();

    return this;
  }

  post() {

  }

  put() {

  }

  send() {

  }

  then(onSuccess, onError, onProgress) {
    if (onSuccess || onError) {
      if (event.target.readyState === 4) {
        const response = {
          status: this.event.status,
          data: JSON.parse(this.event.target.responseText)
        };

        onSuccess(response);
      }

      // TODO: Find out how to check if error
    }

    if (onProgress) {
      // TODO: Run every time this.event changes
      const response = {
        status: this.event.status,
        data: JSON.parse(this.event.target.responseText),
        loaded: this.event.loaded,
        total: this.event.total
      };

      onProgress(response);
    }
  }
}
