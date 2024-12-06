import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import { Form, Field, Formik } from 'formik';
import * as Yup from 'yup';
import { TextBase, Loader } from 'components';
import endPoints from 'endPoints/endPoints';
import messages from 'constantes/messages';
import { withApi, withNotification } from 'wrappers';
import { FormButtons, SelectBase } from 'components/controls';
import { useNavigate } from 'react-router';

const validationSchema = Yup.object({

});

const urlBase = endPoints.seguridad.usuarios.base;

const baseUrl = '/app/seguridad/usuarios';

const initState = {
  name: '',
  email: '',
  role: '',
  password: '',
  compania_id: 1,
  roles: []
};

const PresolpedForm = ({
  id,
  doGet,
  genericException,
  appSuccess,
  doPost,
  doPut,
  appInfo,
  refresh
}) => {
  const navigate = useNavigate();
  const [state, setState] = useState(initState);

  // Call to API for load form values
  const loadFields = useCallback(async () => {
    const params = {
      url: endPoints.seguridad.usuarios.initFormComponent,
      data: id ? { id: id } : {}
    };
    const resp = await doGet(params);
    return resp;
  }, [doGet, id, refresh]);

  const selectMap = (data) => data.map((row) => ({ value: row.id, label: row.name }));

  const init = useCallback(async () => {
    try {
      const {user,roles}  = await loadFields();
      const {
        name,
        email,
        role_id: role
      } = user;

      const rolesSelect = selectMap(roles);

      setState({
        id: id || null,
        name: name || '',
        email: email || '',
        role: role || '',
        roles: rolesSelect
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
    const { name, email, password, role, username } = values;
    return {
      name: name,
      email: email,
      password: password,
      confirm_password: password,
      role_id: role,
      username: username
    };
  };

  const submit = async (valuesForm) => {
    const data = mapValues(valuesForm);
    const params = {
      url: id ? `${urlBase}/${id}` : urlBase,
      data: data
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
      console.log('ERROR AL GUARDAR '+error);
      genericException(error);
    }
  };

  const {isLoading, roles } = state;
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
                <Field label="Nombre" name="name" component={TextBase} />
              </Grid>
              <Grid item xs={6} md={6} xl={6}>
                <Field label="Correo" name="email" component={TextBase} />
              </Grid>
              <Grid item xs={6} md={6} xl={6}>
                <Field label="Contraseña" name="password" component={TextBase} />
              </Grid>
              <Grid item xs={6} md={6} xl={6}>
                <Field label="Rol" name="role" component={SelectBase} items={roles} />
              </Grid>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

PresolpedForm.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  doPost: PropTypes.func,
  doGet: PropTypes.func,
  doPut: PropTypes.func,
  appInfo: PropTypes.func.isRequired,
  appSuccess: PropTypes.func.isRequired,
  genericException: PropTypes.func.isRequired,
  refresh: PropTypes.oneOfType([PropTypes.object])
};

export default withApi(withNotification(PresolpedForm));
