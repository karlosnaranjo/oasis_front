import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import { Loader } from "components";
import endPoints from "endPoints/endPoints";
import messages from "constantes/messages";
import { withApi, withNotification } from "wrappers";

import "./Comment.css";
import Core from "components/comments/Core";
import { CommentProvider } from "./commentContext";
import useAuth from "hooks/useAuth";

function WorkOrderCommentForm({
  id,
  doGet,
  appError,
  doPut,
  doPost,
  appInfo,
  appSuccess,
  refreshTable,
}) {
  const work_order_id = id;
  const [loading, setLoading] = useState(true);
  const [commentSection, setCommentSection] = useState([]);
  const { user } = useAuth();

  const currentUser = {
    image: {
      png: "./images/avatars/image-general.png",
      webp: "./images/avatars/image-general.webp",
    },
    username: user?.name || "Usuario No Registrado",
  };

  const loadInitForm = async () => {
    const params = {
      url: endPoints.transactions.workOrderComment.base,
      data: { id: id || null },
    };
    const response = await doGet(params);
    return response.response.data;
  };

  const init = async () => {
    try {
      const formData = await loadInitForm();
      setLoading(false);
      setCommentSection(formData);
    } catch (error) {
      appError(messages.dataFetch.fail);
    }
  };

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mapValues = (values) => {
    const { isPriority, isProduct, comment } = values;

    return {
      work_order_id: work_order_id,
      is_priority: isPriority,
      is_product: isProduct,
      comment: comment,
      user_id: user?.id || null,
    };
  };

  const saveComment = async (formValues) => {
    const dataValues = mapValues(formValues);
    const params = {
      url: endPoints.transactions.workOrderComment.base,
      data: dataValues,
    };
    try {
      await doPost(params);
      if (id) {
        appInfo(messages.crud.update);
      } else {
        appSuccess(messages.crud.new);
      }
    } catch (error) {
      console.log(error);
      appError(messages.crud.fail, error);
    } finally {
      //setOpenModal(false);
    }
  };

  return (
    <>
      {loading ? (
        <Box p={10}>
          <Loader />
        </Box>
      ) : (
        <CommentProvider
          work_order_id={work_order_id}
          currentUser={currentUser}
          saveComment={saveComment}
          commentSection={commentSection}
          setCommentSection={setCommentSection}
        >
          <Core />
        </CommentProvider>
      )}
    </>
  );
}

WorkOrderCommentForm.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  work_order_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  appInfo: PropTypes.func.isRequired,
  setOpenModal: PropTypes.func.isRequired,
  appSuccess: PropTypes.func.isRequired,
  appError: PropTypes.func.isRequired,
  doGet: PropTypes.func.isRequired,
  doPut: PropTypes.func.isRequired,
  doPost: PropTypes.func.isRequired,
  refreshTable: PropTypes.func.isRequired,
};

export default withApi(withNotification(WorkOrderCommentForm));
