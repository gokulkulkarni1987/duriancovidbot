const axios = require("axios");

class NetworkHandler {
  constructor() {
    const instance = axios.create({
      baseURL: process.env.NOVEL_API_BASE_PATH,
      timeout: process.env.NOVEL_NETWORK_TIME_OUT,
    });
    // instance.interceptors.response.use(this.handleSuccess, this.handleError);
    this.instance = instance;
  }

  handleSuccess = response => {
    return Promise.resolve(response);
  };

  handleError = error => {
    if (error.response && error.response.status) {
      const status = error.response.status;
      switch (status) {
        case UNAUTHORISED_STATUS_CODE:
          store.dispatch({
            type: LOGOUT,
          });
          break;
        case 404: //Host unreachable
          break;
        case 502: //Bad Gateway
          break;
        case 500: // Service Failure
          break;
        case 503: //Service Unavailable
          break;
        default:
          break;
      }
      store.dispatch({
        type: LOGOUT,
      });
    }
  };

  get = (path, header) => {
    return new Promise((resolve, reject) => {
      let options = {};
      if (header) {
        options.headers = header;
      }
      this.instance
        .get(path, options)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
          this.handleError(error);
        });
    });
  };

  post = (path, body, header) => {
    return new Promise((resolve, reject) => {
      let options = {};
      if (header) {
        options.header = header;
      }
      this.instance
        .post(path, body, options)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
          this.handleError(error);
        });
    });
  };

  put = (path, body, header) => {
    return new Promise((resolve, reject) => {
      let options = {};
      if (header) {
        options.headers = header;
      }
      this.instance
        .put(path, body, options)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
          this.handleError(error);
        });
    });
  };

  delete = (path, body) => {
    return new Promise((resolve, reject) => {
      this.instance
        .delete(path, body)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
          this.handleError(error);
        });
    });
  };
}

const requestHandler = new NetworkHandler();

module.exports = {
  requestHandler
}