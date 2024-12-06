import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ApiServiceFecth from "service/ApiServiceFecth";
import { blobToBase64, fireDownloadFromResponse } from "./config/helpers";
//import { Button } from "@material-ui/core";
import { withNotification } from "wrappers";
import endPoints from "endPoints/endPoints";
import { ButtonBase } from "@mui/material";

function ImagePreview({
  alt,
  url,
  downloadUrl,
  genericException,
  appSuccess,
  appNotify,
  appInfo,
  appWarning,
  appError,
  ...rest
}) {
  const [src, setSrc] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const response = await ApiServiceFecth.get({ url });
      let data = "//";
      if (response.ok) {
        const blob = await response.blob();
        data = await blobToBase64(blob);
      }
      setSrc(data);
    };
    getData();
  }, [url]);

  const handleDownload = async () => {
    try {
      const file = await ApiServiceFecth.download(
        endPoints.general.images.download,
        { imageUrl: downloadUrl }
      );
      const contentType = file.headers.get("content-type");
      const type = contentType.split("/")[1];

      fireDownloadFromResponse(file, `imagen_${Date.now()}.${type}`);
    } catch (error) {
      genericException(error);
    }
  };

  if (downloadUrl) {
    return (
      src && (
        <ButtonBase onClick={handleDownload}>
          <img src={src} alt={alt} {...rest} />
        </ButtonBase>
      )
    );
  }

  return src && <img src={src} alt={alt} {...rest} />;
}

ImagePreview.defaultProps = {
  alt: "Imagen",
  downloadUrl: false,
};

ImagePreview.propTypes = {
  alt: PropTypes.string,
  url: PropTypes.string.isRequired,
  downloadUrl: PropTypes.string,
  genericException: PropTypes.func,
  appSuccess: PropTypes.func,
  appNotify: PropTypes.func,
  appInfo: PropTypes.func,
  appWarning: PropTypes.func,
  appError: PropTypes.func,
};

export default withNotification(ImagePreview);
