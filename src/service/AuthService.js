import JwtDecode from 'jwt-decode';
import Cookie from 'js-cookie';
import { TOKEN_KEY, SESSION_INFO_KEY, BEARER_PREFIX } from './AuthConstants';

/**
 * Clase creada con el propósito de centralizar la logica para el
 * manejo de los items relacionados con la sesion.
 */
class AuthService {
  /**
   * Retorna todas las keys que van al metodo de almacenamiento de información relacionados
   * con la sesion, todo key que se agregue al metodo de almacenamiento de información debe ser
   * agregado a este array para que sea llamado por el metodo @see #logout
   */
  getSessionKeys = () => [TOKEN_KEY, SESSION_INFO_KEY];

  /**
   * Metodo que se encarga de eliminar del metodo de almacenamiento de información
   * todas las keys y values relacionados con la sesión.
   */
  logout = () => {
    this.getSessionKeys().forEach((key) => Cookie.remove(key));
  };

  /**
   * Metodo que contiene la logica necesaria para guardar la informacion de la sesion,
   * despúes de que el usuario se ha autenticado exitosamente o renovado dicha
   * autenticación.
   *
   * @param sessionData los datos que retorna el proveedor de autenticación
   */
  storeSessionData = (accessToken) => {
    if (accessToken) {
      Cookie.set(TOKEN_KEY, accessToken);
    } else {
      Cookie.remove(TOKEN_KEY);
    }
  };

  /**
   * Metodo que contiene la logica necesaria para obtener el token de sesion
   * con el prefijo indicado en la constante @see BEARER_PREFIX
   *
   * @return string el token de sesion con el prefijo.
   */
  getAuthorizationBearer = () => `${BEARER_PREFIX} ${this.getToken()}`;

  /**
   * Metodo que contiene la logica necesaria para obtener el token de sesion
   * directamente desde el metodo de almacenamiento de información
   *
   * @return string el token de sesion o null si no existe
   */
  getToken = () => Cookie.get(TOKEN_KEY);

  /**
   * Metodo que contiene la logica necesaria para retornar los datos que
   * que entrega el proveedor de autenticacion desde el metodo de almacenamiento de información
   *
   * @return Object o null si no existe dicha key en el metodo de almacenamiento de información
   */
  getSessionInfo = () => {
    const info = Cookie.get(SESSION_INFO_KEY);
    return info ? JSON.parse(info) : null;
  };

  /**
   * Metodo que contiene la lógica necesaria para determinar el id del
   * usuario actualmente logueado
   *
   * @return int el id del ususario o undefined si no se ha establecido la sesión
   */
  getCurrentUserId = () => {
    const { user_id: userId } = this.getSessionInfo() || {};
    return userId;
  };

  /**
   * Método que contiene la lógica para verificar el estado del token
   * en el lado del cliente, no se debe confiar 100% en este metodo,
   * ya que quien tiene la ultima palabra es el servidor.
   *
   * @return { boolean } si el token está presente y su tiempo de expiracion no ha sido alcanzado
   * y no se está utilizando antes de tiempo
   *
   */
  isTokenValid = () => {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    try {
      return true;
      // console.log(token, 'TOKEN');
      // const decodedToken = JwtDecode(token);
      // const now = Date.now().valueOf() / 1000;
      // const expired = decodedToken.exp && decodedToken.exp < now;
      // return !expired;
      // const inactive = (!decodedToken.nbf || (decodedToken.nbf && decodedToken.nbf >= now));
      // return !(expired && inactive);
    } catch (error) {
      return false;
    }
  };

  isAuthenticated = () => !!this.getToken();
}

export default new AuthService();
