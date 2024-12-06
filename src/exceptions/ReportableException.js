export default class ReportableException extends Error {
  constructor(jsonResponse) {
    super(jsonResponse.message);
  }
}
