import { RequestExceptionFactory } from "exceptions";
import endPoints from "endPoints/endPoints";
import authService from "./AuthService";

/**
 * Esta clase permite realizar peticiones asincronicas a una api
 * mediante el uso de Fetch para GET,POST,DELETE....
 */
class ApiServiceFecth {
  constructor() {
    this.path =
      process.env.REACT_APP_API_SERVER + process.env.REACT_APP_API_VERSION;
    this.head_content = {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    };
  }

  configOptions(bearer, method) {
    const headerApi = this.head_content;

    if (bearer) {
      const authorizationBearer = {
        Authorization: authService.getAuthorizationBearer(),
      };
      Object.assign(headerApi, authorizationBearer);
    }

    return {
      method,
      headers: headerApi,
      mode: "cors",
      cache: "default",
    };
  }

  /**
   * Este metodo contiene la logica necesaria procesar una url,
   * define si la url es apta para realizar una solicitud,
   * se tiene en cuenta los valores establecidos en el .env
   *
   * @param {string} url cadena de texto que indica a donde se realizara la solicitud
   * @param {boolean} si boleano que indica si se realizara la peticion al SI o por defecto al Back
   * @return {string} devuelve una url lista para ser consumida con la logica aplicada
   * @throws {Error} lanza un error cuando la url no esta presente
   * @author Sergio Gonzalez
   * @since 12 de noviembre del 2019
   */
  procesarUrl(url) {
    if (!url) {
      throw new Error("La URL es requerida para este metodo");
    }
    return this.path + url;
  }

  async download(url, data) {
    const response = await this.get({ url, data });
    if (!response.ok) {
      throw await RequestExceptionFactory.fromHttpResponse(response);
    }
    return response;
  }

  /**
   * Obtiene los datos correspondientes al recurso (url) que fue enviado como parámetro
   *
   * @param params array con valores para procesos el request. url(recurso al que se va acceder),
   *  bearer(Si es true agrega a los headers al autenticación  tipo bearer),
   * @return Devuelve un código de estado HTTP.
   */

  // eslint-disable-next-line object-curly-newline
  async get({ url = null, bearer = true, data = {} }) {
    const urlPath = this.procesarUrl(url);
    const optionsFetch = this.configOptions(bearer, "GET");

    const parametros = new URLSearchParams(data);
    const urlFinal = `${urlPath}?${parametros.toString()}`;

    // eslint-disable-next-line consistent-return
    return fetch(urlFinal, optionsFetch);
  }

  // eslint-disable-next-line object-curly-newline
  async post({ url = null, bearer = true, data = {} }) {
    const urlPath = this.procesarUrl(url);
    const optionsFetch = this.configOptions(bearer, "POST");
    optionsFetch.body = JSON.stringify(data);

    // eslint-disable-next-line consistent-return
    return fetch(urlPath, optionsFetch);
  }

  async postFormData({ url = null, bearer = true, data = new FormData() }) {
    const urlPath = this.procesarUrl(url);
    //const formData = ({ data } = data);
    const optionsFetch = this.configOptions(bearer, "POST");
    optionsFetch.body = data;
    optionsFetch.headers = {
      Authorization: authService.getAuthorizationBearer(),
      "X-Requested-With": "XMLHttpRequest",
    };

    /* console.log("archivos a enviar", urlPath, optionsFetch);
    for (let pair of data.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    } */

    // eslint-disable-next-line consistent-return
    return fetch(urlPath, optionsFetch);
  }

  // eslint-disable-next-line object-curly-newline
  async put({ url = null, bearer = true, data = {} }) {
    const urlPath = this.procesarUrl(url);
    const optionsFetch = this.configOptions(bearer, "PUT");
    optionsFetch.body = JSON.stringify(data);

    // eslint-disable-next-line consistent-return
    return fetch(urlPath, optionsFetch);
  }

  // eslint-disable-next-line object-curly-newline
  async delete({ url = null, bearer = true, data = {} }) {
    const urlPath = this.procesarUrl(url);
    const optionsFetch = this.configOptions(bearer, "DELETE");
    optionsFetch.body = JSON.stringify(data);

    // eslint-disable-next-line consistent-return
    return fetch(urlPath, optionsFetch);
  }

  logout = async () => {
    const params = {
      url: endPoints.auth.logout,
    };
    const response = await this.post(params);
    authService.logout();
    return response;
  };

  login = async (data) => {
    const params = {
      url: endPoints.auth.login,
      data,
      bearer: false,
    };
    return this.post(params);
  };

  getUser = async () => {
    const params = {
      url: endPoints.auth.getUser,
      bearer: true,
    };
    return this.get(params);
  };
}

export const initParams = (url, bearer = true) => ({ url, bearer });

export default new ApiServiceFecth();
