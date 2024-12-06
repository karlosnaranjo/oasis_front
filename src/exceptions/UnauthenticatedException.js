export default class UnauthenticatedException extends Error {
  constructor() {
    super('La sesión caduco');
  }
}
