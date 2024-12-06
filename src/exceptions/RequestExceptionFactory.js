import HttpStatus from 'http-status-codes';
import ReportableException from './ReportableException';
import UnauthenticatedException from './UnauthenticatedException';
import UnprocessableException from './UnprocessableException';

export default class RequestExceptionFactory {
  static fromHttpResponse = async (httpResponse) => {
    const jsonResponse = await httpResponse.json();
    switch (httpResponse.status) {
      case HttpStatus.CONFLICT:
        return new ReportableException(jsonResponse);
      case HttpStatus.UNPROCESSABLE_ENTITY:
        return new UnprocessableException(jsonResponse);
      case HttpStatus.UNAUTHORIZED:
        return new UnauthenticatedException(jsonResponse);
      default:
        return Error(httpResponse.statusText);
    }
  };
}
