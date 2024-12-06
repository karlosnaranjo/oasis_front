import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { Table } from "components";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";

// Chip, ChipColors
import endPoints from "endPoints/endPoints";
import { withApi, withNotification } from "wrappers";
import masterMessages from "constantes/masterMessages";
import WorkOrderCommentForm from "./Form";

const {
  transactions: {
    workOrder: { comments },
  },
} = masterMessages;

function WorkOrderCommentIndex({ id, editable, setOpenModalIndex }) {
  const work_order_id = id;

  const [openModal, setOpenModal] = useState(false);
  const [idToUpdate, setIdToUpdate] = useState(null);

  const tableRef = useRef(null);

  useEffect(() => {
    if (!openModal) {
      setIdToUpdate(null);
    }
  }, [openModal]);

  const refreshTableWorkOrderComment = () => tableRef.current.refresh();

  const openModalForm = (id = null) => {
    setIdToUpdate(id);
    setOpenModal(true);
  };

  const closeModalUpdate = () => {
    setOpenModal(false);
    setIdToUpdate(null);
  };

  const columns = [
    { name: "user_id", label: "Usuario" },
    { name: "comment", label: "Comentario" },
    { name: "created_at", label: "Fecha" },
  ];

  return (
    <Dialog
      fullWidth={true}
      maxWidth="l"
      open
      onClose={() => setOpenModalIndex(false)}
      aria-labelledby="max-width-dialog-title"
    >
      <DialogTitle id="max-width-dialog-title">{comments}</DialogTitle>
      <DialogContent>
        {openModal && (
          <WorkOrderCommentForm
            id={null}
            work_order_id={work_order_id}
            setOpenModal={closeModalUpdate}
            refreshTable={refreshTableWorkOrderComment}
            editable={editable}
          />
        )}
        <Table
          forwardedRef={tableRef}
          onCreate={() => setOpenModal(true)}
          serverSideUrl={`${endPoints.transactions.workOrderComment.base}/${id}`}
          columns={columns}
        />
      </DialogContent>
    </Dialog>
  );
}

WorkOrderCommentIndex.propTypes = {
  appWarning: PropTypes.func.isRequired,
  appError: PropTypes.func.isRequired,
};

export default withApi(withNotification(WorkOrderCommentIndex));
