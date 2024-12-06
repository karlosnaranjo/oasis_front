import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Grid, Dialog, DialogTitle, DialogContent } from "@mui/material";
import { Form, Field, Formik } from "formik";
import * as Yup from "yup";
import { Box } from "@mui/system";
import {
  ButtonSave,
  ButtonBase,
  Loader,
  SelectBase,
  TextBase,
  NumberBase,
} from "components";
import endPoints from "endPoints/endPoints";
import messages from "constantes/messages";
import { withApi, withNotification } from "wrappers";
import masterMessages from "constantes/masterMessages";

let materialesList = [];
let maquinasList = [];
let motivosList = [];
let centrosList = [];

let estadoList = [
  { label: "Activo", value: "Activo" },
  { label: "Anulado", value: "Anulado" },
];
const validationSchema = Yup.object({
  //code: Yup.string().required('El campo código es requerido')
});

const {
  seguridad: {
    rolPermission: { createTitle, updateTitle },
  },
} = masterMessages;

const initialValues = {};

const selectMap = (data) => {
  return data.map((row) => ({ value: row.id, label: row.nombre }));
};
function RolPermissionForm({
  id,
  role_id,
  doGet,
  appError,
  doPut,
  doPost,
  appInfo,
  appSuccess,
  setOpenModal,
  refreshData,
  refreshTable,
}) {
  console.log("al entrar en el MODAL " + role_id);
  const [loading, setLoading] = useState(true);
  const [formState, setFormState] = useState(initialValues);
  const main_id = role_id;

  const titleForm = `${!id ? createTitle : updateTitle}`;

  const loadInitForm = async () => {
    const paramas = {
      url: endPoints.seguridad.rolesPermission.initForm,
      data: { id: id || "" },
    };
    const response = await doGet(paramas);
    return response;
  };

  const init = async () => {
    try {
      const {
        presolpedDetalle,
        material,
        maquina,
        motivoSolicitud,
        centroCosto,
      } = await loadInitForm();

      materialesList = selectMap(material);
      maquinasList = selectMap(maquina);
      motivosList = selectMap(motivoSolicitud);
      centrosList = selectMap(centroCosto);

      const {
        role_id,
        cantidad,
        estado,
        material_id,
        maquina_id,
        motivo_solicitud_id,
        centro_costo_id,
      } = presolpedDetalle || {};
      setLoading(false);

      setFormState({
        role_id: role_id || main_id,
        cantidad: cantidad || 0,
        estado: estado || "Activo",
        material_id: material_id || null,
        maquina_id: maquina_id || null,
        motivo_solicitud_id: motivo_solicitud_id || null,
        centro_costo_id: centro_costo_id || null,
      });
    } catch (error) {
      appError(messages.dataFetch.fail);
    }
  };

  useEffect(() => {
    init();
  }, []);

  const mapValues = (values) => {
    const {
      role_id,
      cantidad,
      estado,
      material_id,
      maquina_id,
      motivo_solicitud_id,
      centro_costo_id,
    } = values;

    return {
      role_id,
      cantidad,
      estado,
      material_id,
      maquina_id,
      motivo_solicitud_id,
      centro_costo_id,
    };
  };

  const onSubmit = async (formValues) => {
    const method = id ? doPut : doPost;
    const dataValues = mapValues(formValues);
    const params = {
      url: `${endPoints.seguridad.rolesPermission.base}${id ? `/${id}` : ""}`,
      data: dataValues,
    };

    try {
      await method(params);
      if (id) {
        appInfo(messages.crud.update);
      } else {
        appSuccess(messages.crud.new);
      }
      refreshTable();
    } catch (error) {
      appError(messages.crud.fail, error);
    } finally {
      setOpenModal(false);
      refreshData.current.refresh();
    }
  };

  return (
    <Dialog
      fullWidth
      open
      onClose={() => setOpenModal(false)}
      aria-labelledby="max-width-dialog-title"
    >
      <DialogTitle id="max-width-dialog-title">{titleForm}</DialogTitle>
      <DialogContent>
        {loading ? (
          <Box p={10}>
            <Loader />
          </Box>
        ) : (
          <Formik
            enableReinitialize
            initialValues={formState}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <Grid container direction="row" spacing={1}>
                  <Grid item xs={12} md={12} xl={12}>
                    <Field
                      label="role_id"
                      name="role_id"
                      component={TextBase}
                      style={{ display: "none" }}
                    />
                    <Field
                      label="Material"
                      name="material_id"
                      component={SelectBase}
                      items={materialesList}
                    />
                  </Grid>
                  <Grid item xs={6} md={6} xl={6}>
                    <Field
                      label="Máquina"
                      name="maquina_id"
                      component={SelectBase}
                      items={maquinasList}
                    />
                  </Grid>
                  <Grid item xs={6} md={6} xl={6}>
                    <Field
                      label="Motivo de Solicitud"
                      name="motivo_solicitud_id"
                      component={SelectBase}
                      items={motivosList}
                    />
                  </Grid>
                  <Grid item xs={6} md={6} xl={6}>
                    <Field
                      label="Cento de Costos"
                      name="centro_costo_id"
                      component={SelectBase}
                      items={centrosList}
                    />
                  </Grid>
                  <Grid item xs={6} md={6} xl={6}>
                    <Field
                      label="Cantidad"
                      name="cantidad"
                      component={NumberBase}
                    />
                  </Grid>
                  <Grid item xs={6} md={6} xl={6}>
                    <Field
                      label="Estado"
                      name="estado"
                      component={SelectBase}
                      items={estadoList}
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
                    <ButtonSave disabled={isSubmitting} />
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

RolPermissionForm.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  role_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  appInfo: PropTypes.func.isRequired,
  setOpenModal: PropTypes.func.isRequired,
  appSuccess: PropTypes.func.isRequired,
  appError: PropTypes.func.isRequired,
  doGet: PropTypes.func.isRequired,
  doPut: PropTypes.func.isRequired,
  doPost: PropTypes.func.isRequired,
  refreshData: PropTypes.oneOfType([PropTypes.object]),
};

export default withApi(withNotification(RolPermissionForm));
