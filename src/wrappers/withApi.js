import React from "react";
import ApiServiceFecth from "service/ApiServiceFecth";
import { RequestExceptionFactory } from "exceptions";
import PropTypes from "prop-types";
import HttpStatus from "http-status-codes";
import useAuth from "hooks/useAuth";

/**
 * @author Juan Fernando Pavas <garzonp2001@gmail.com>
 * This HOC allows to use a common interface to call api methods, using
 * the fetch service.
 */

export default (WrappedComponent) =>
  React.memo((props) => {
    const { clearSession } = useAuth();
    /**
     * This function simplifyies the obtaining right method process from the
     * fetch service.
     */
    const resolveFunc = async (type, data) => {
      let response;
      switch (type) {
        case "post":
          response = await ApiServiceFecth.post(data);
          break;
        case "postForm":
          response = await ApiServiceFecth.postFormData(data);
          break;
        case "put":
          response = await ApiServiceFecth.put(data);
          break;
        case "delete":
          response = await ApiServiceFecth.delete(data);
          break;
        default:
          response = await ApiServiceFecth.get(data);
          break;
      }
      return response;
    };

    /**
     * All the request has the same behavour, we can handle this logic
     * inside a function that only returns the result.
     */
    const doRequest = async (type, data) => {
      const initialResponse = await resolveFunc(type, data);
      if (initialResponse.ok) {
        if (initialResponse.status === HttpStatus.NO_CONTENT) {
          return null;
        }
        let resp = "";
        if (type == "getFile") {
          resp = await initialResponse;
        } else {
          resp = await initialResponse.json();
        }
        return resp;
      }
      if (initialResponse.status === HttpStatus.UNAUTHORIZED) {
        clearSession();
      }
      throw await RequestExceptionFactory.fromHttpResponse(initialResponse);
    };

    /**
     * Allows to call a get request for json data.
     */
    const doGet = async (data) => doRequest("get", data);

    /**
     * Allows to call a get request for blob types.
     */
    const doGetFile = async (data) => doRequest("getFile", data);

    /**
     * Allows to call a post request.
     */
    const doPost = async (data) => doRequest("post", data);

    /**
     * Allows to call a delete request.
     */
    const doDelete = async (data) => doRequest("delete", data);

    /**
     * Allows to call a put request.
     */
    const doPut = async (data) => doRequest("put", data);
    const doPostFormData = async (data) => doRequest("postForm", data);

    /* const doPostFormData = async ({ url, formData }) => {
      for (let pair of formData.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }
       const initialResponse = await ApiServiceFecth.postFormData({
        url,
        body: formData,
      });
      if (initialResponse.ok) {
        const json = await initialResponse.json();
        return json;
      }
      if (initialResponse.status === HttpStatus.UNAUTHORIZED) {
        clearSession();
      }
      throw await RequestExceptionFactory.fromHttpResponse(initialResponse); 
    }; */

    return (
      <WrappedComponent
        doGet={doGet}
        doGetFile={doGetFile}
        doPost={doPost}
        doPut={doPut}
        doDelete={doDelete}
        doPostFormData={doPostFormData}
        {...props}
      />
    );
  });

export const propTypes = {
  doPost: PropTypes.func,
  doGet: PropTypes.func,
  doGetFile: PropTypes.func,
  doDelete: PropTypes.func,
  doPut: PropTypes.func,
  doPostFormData: PropTypes.func,
};
