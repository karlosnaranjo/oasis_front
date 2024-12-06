import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import { Form, Field, Formik } from "formik";
import * as Yup from "yup";
import {
  SelectBase,
  TextBase,
  TextAreaBase,
  AutoCompleteBase,
  Loader,
} from "components";
import endPoints from "endPoints/endPoints";
import messages from "constantes/messages";
import { withApi, withNotification } from "wrappers";
import { FormButtons } from "components/controls";
import { useNavigate } from "react-router";

const validationSchema = Yup.object({
  /* documentoCompra: Yup.number().required('El campo es requerido'),
  documentoProveedor: Yup.string().required('El campo es requerido'),
  proveedor: Yup.number().required('El campo es requerido'),
  // moneda: Yup.number().required('El campo es requerido'),
  fechaCompra: Yup.date().required('El campo fecha es requerida'),
  bodega: Yup.number().when('requiereBodega', (requiereBodega, schema) =>
    requiereBodega ? schema.required('El campo incoterm es requerido') : schema
  ) */
});

const urlBase = endPoints.seguridad.roles.base;

let empleadosList = [{ label: "General", value: "1" }];

const baseUrl = "/app/seguridad/roles";

const initState = {
  nombre: "",
  compania_id: 1,
};

const RolForm = ({
  id,
  doGet,
  genericException,
  appSuccess,
  doPost,
  doPut,
  appInfo,
  refresh,
}) => {
  const navigate = useNavigate();
  const [state, setState] = useState(initState);

  // Call to API for load form values
  const loadFields = useCallback(async () => {
    const params = {
      url: endPoints.seguridad.roles.initFormComponent,
      data: id ? { id: id } : {},
    };
    const resp = await doGet(params);
    return resp;
  }, [doGet, id, refresh]);

  const init = useCallback(async () => {
    try {
      const seguridad = await loadFields();
      const { name: nombre } = seguridad;

      setState({
        id: id || null,
        nombre: nombre || "",
      });
    } catch (error) {
      genericException(error);
    }
  }, [genericException, loadFields]);

  useEffect(() => {
    init();
  }, [init]);

  const redirectEdit = (id) => {
    navigate(`${baseUrl}/edit/${id}`, { replace: false });
  };

  const mapValues = (values) => {
    const { nombre } = values;
    return {
      name: nombre,
    };
  };

  const submit = async (valuesForm) => {
    const data = mapValues(valuesForm);
    const params = {
      url: id ? `${urlBase}/${id}` : urlBase,
      data: data,
    };
    const method = id ? doPut : doPost;

    try {
      const resp = await method(params);
      if (id) {
        appInfo(messages.crud.update);
        redirectEdit(resp.id);
      } else {
        appSuccess(messages.crud.new);
        redirectEdit(resp.id);
      }
    } catch (error) {
      console.log("ERROR AL GUARDAR " + error);
      genericException(error);
    }
  };

  const { isLoading } = state;
  return isLoading ? (
    <Loader />
  ) : (
    <Formik
      enableReinitialize
      initialValues={state}
      validationSchema={validationSchema}
      onSubmit={submit}
    >
      {(subProps) => (
        <Form>
          <FormButtons formProps={subProps} />
          <Grid container direction="row" spacing={2}>
            <Grid container item spacing={2}>
              <Grid item xs={6} md={6} xl={6}>
                <Field label="Nombre" name="nombre" component={TextBase} />
              </Grid>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

RolForm.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  doPost: PropTypes.func,
  doGet: PropTypes.func,
  doPut: PropTypes.func,
  appInfo: PropTypes.func.isRequired,
  appSuccess: PropTypes.func.isRequired,
  genericException: PropTypes.func.isRequired,
  setViewMode: PropTypes.func,
  refresh: PropTypes.oneOfType([PropTypes.object]),
};

export default withApi(withNotification(RolForm));
