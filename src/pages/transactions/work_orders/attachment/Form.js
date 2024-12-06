import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Grid, Dialog, DialogTitle, DialogContent } from "@mui/material";
import { Form, Field, Formik } from "formik";
import { Box } from "@mui/system";
import {
  TextBase,
  ButtonSave,
  ButtonBase,
  Loader,
  SwitchBase,
} from "components";
import endPoints from "endPoints/endPoints";
import messages from "constantes/messages";
import { withApi, withNotification } from "wrappers";
import masterMessages from "constantes/masterMessages";
import { getStatusLabel, getStatusValue } from "utils/formHelpers";

const {
  transactions: {
    workOrderAttachment: { createTitle, updateTitle },
  },
} = masterMessages;

const initialValues = {
  title: "",
  description: "",
  is_default_file: false,
  status: 1,
};

function WorkOrderAttachmentForm({
  id,
  setOpenModal,
  doGet,
  appError,
  doPut,
  doPost,
  appInfo,
  appSuccess,
  refreshTable,
}) {
  const [loading, setLoading] = useState(true);
  const [formState, setFormState] = useState(initialValues);

  const titleForm = `${!id ? createTitle : updateTitle}`;

  const loadInitForm = async () => {
    const params = {
      url: endPoints.transactions.workOrderAttachment.initForm,
      data: { id: id || "" },
    };

    const response = await doGet(params);
    return response;
  };

  const init = async () => {
    try {
      const formData = await loadInitForm();
      const { title, description, is_default_file, status } =
        formData.master || {};
      setLoading(false);
      setFormState({
        title: title || "",
        description: description || "",
        is_default_file: is_default_file || false,
        status: getStatusLabel(status) || "Activo",
      });
    } catch (error) {
      appError(messages.dataFetch.fail);
    }
  };

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mapValues = (values) => {
    const { title, description, is_default_file, status } = values;

    return {
      title,
      description,
      is_default_file,
      status: getStatusValue(status),
    };
  };

  const onSubmit = async (formValues) => {
    const method = id ? doPut : doPost;
    const dataValues = mapValues(formValues);
    const params = {
      url: `${endPoints.transactions.workOrderAttachment.base}${
        id ? `/${id}` : ""
      }`,
      data: dataValues,
    };
    try {
      await method(params);
      if (id) {
        appInfo(messages.crud.update);
      } else {
        appSuccess(messages.crud.new);
      }
    } catch (error) {
      console.log(error);
      appError(messages.crud.fail, error);
    } finally {
      setOpenModal(false);
      refreshTable();
    }
  };

  return (
    <Dialog
      fullWidth
      open
      onClose={() => setOpenModal(false)}
      aria-labelledby="max-width-dialog-title"
    >
      <DialogTitle id="max-width-dialog-title">
        Información del Archivo
      </DialogTitle>
      <DialogContent>
        {loading ? (
          <Box p={10}>
            <Loader />
          </Box>
        ) : (
          <Formik
            enableReinitialize
            initialValues={formState}
            onSubmit={onSubmit}
          >
            {(subProps) => (
              <Form>
                <Grid container direction="row" spacing={2}>
                  <Grid item xs={12} md={12} xl={12}>
                    <Field label="Título" name="title" component={TextBase} />
                  </Grid>
                  <Grid item xs={12} md={12} xl={12}>
                    <Field
                      label="Descripción"
                      name="description"
                      component={TextBase}
                    />
                  </Grid>
                  <Grid item xs={12} md={12} xl={12}>
                    <Field
                      label="Archivo referente al producto"
                      name="is_default_file"
                      component={SwitchBase}
                    />
                  </Grid>
                  <Grid item xs={12} md={12} xl={12}>
                    <Field
                      label="Estado"
                      name="status"
                      component={TextBase}
                      disabled={true}
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  style={{ paddingTop: 30 }}
                  justify="flex-end"
                >
                  <Grid item>
                    <ButtonSave disabled={subProps.isSubmitting} />
                    <ButtonBase
                      onClick={() => setOpenModal(false)}
                      label="Cancelar"
                      style={{ marginLeft: 15 }}
                    />
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        )}
      </DialogContent>
    </Dialog>
  );
}

WorkOrderAttachmentForm.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  appInfo: PropTypes.func.isRequired,
  setOpenModal: PropTypes.func.isRequired,
  appSuccess: PropTypes.func.isRequired,
  appError: PropTypes.func.isRequired,
  doGet: PropTypes.func.isRequired,
  doPut: PropTypes.func.isRequired,
  doPost: PropTypes.func.isRequired,
  refreshTable: PropTypes.func.isRequired,
};

export default withApi(withNotification(WorkOrderAttachmentForm));
