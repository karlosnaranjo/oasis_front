export default class UnprocessableException extends Error {
  constructor(jsonResponse) {
    super(Object.values(jsonResponse.errors).join(', ') || jsonResponse.message);
  }
}
