import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { Form, Field, Formik } from 'formik';
import * as Yup from 'yup';
import { Box } from '@mui/system';
import { ButtonSave, ButtonBase, Loader, SelectBase, TextBase, NumberBase } from 'components';
import endPoints from 'endPoints/endPoints';
import messages from 'constantes/messages';
import { withApi, withNotification } from 'wrappers';
import masterMessages from 'constantes/masterMessages';
import { getStatusLabel, getStatusValue } from 'utils/formHelpers'; 

const validationSchema = Yup.object({
  quantity: Yup.string().required('La cantidad es obligatoria')
});

const {
  transactions: {
    workOrderDetails: { createTitle, updateTitle }
  }
} = masterMessages;

let colorList = [];
let sizeList = [];

const initialValues = {
 
};

function WorkOrderDetails({
  id,
  work_order_id,
  doGet,
  appError,
  doPut,
  doPost,
  appInfo,
  appSuccess,
  refreshData,
  setOpenModal,
  refreshTable
}) {
  const [loading, setLoading] = useState(true);
  const [formState, setFormState] = useState(initialValues);
  const work_id = work_order_id;

  const titleForm = `${!id ? createTitle : updateTitle}`;

  const selectMap = useCallback(
    (data, campo = 'description') => data.map((row) => ({ value: row.id, label: row[campo] })),
    []
  );

  const loadInitForm = async () => {
    const paramas = {
      url: endPoints.transactions.workOrderDetails.initForm,
      data: { id: id || '' }
    };
    const response = await doGet(paramas);
    return response;
  };


  const init = async () => {
    try {
      const formData = await loadInitForm();
      const {work_order_detail, colors, sizes} = formData;
      const { 
        work_order_id,
        color_id,
        size_id,
        description,
        quantity,
        status 
      } = work_order_detail || {};

      colorList = selectMap(colors);
      sizeList = selectMap(sizes);

      setLoading(false);

      setFormState({
        work_order_id: work_order_id || work_id,
        color_id: color_id || null,
        size_id: size_id || null,
        description: description || '',
        quantity: quantity || 0,
        status: getStatusLabel(status) || 'Activo'
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
    const { work_order_id, color_id, size_id, description, quantity, status } = values;

    return {
      work_order_id,
      color_id,
      size_id,
      description,
      quantity,
      status: getStatusValue(status) || 'Activo'
    };
  };

  const onSubmit = async (formValues) => {
    const method = id ? doPut : doPost;
    const dataValues = mapValues(formValues);
    const params = {
      url: `${endPoints.transactions.workOrderDetails.base}${id ? `/${id}` : ''}`,
      data: dataValues
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
    <Dialog fullWidth open onClose={() => setOpenModal(false)} aria-labelledby="max-width-dialog-title">
      <DialogTitle id="max-width-dialog-title">{titleForm}</DialogTitle>
      <DialogContent>
        {loading ? (
          <Box p={10}>
            <Loader />
          </Box>
        ) : (
          <Formik enableReinitialize initialValues={formState} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ isSubmitting, handleChange }) => (
              <Form>
                <Grid container direction="row" spacing={2}>
                  <Grid item xs={12} md={12} xl={12}>
                    <Field label="work_order_id" name="work_order_id" component={TextBase} style={{display:'none'}}/>
                    <Field label="Color" name="color_id" component={SelectBase} items={colorList} />
                  </Grid>
                  <Grid item xs={12} md={12} xl={12}>
                    <Field label="Talla" name="size_id" component={SelectBase} items={sizeList} />
                  </Grid>
                  <Grid item xs={12} md={12} xl={12}>
                    <Field label="Cantidad" name="quantity" component={NumberBase} />
                  </Grid>
                  <Grid item xs={12} md={12} xl={12}>
                    <Field label="Descripción" name="description" component={TextBase} />
                  </Grid>
                  <Grid item xs={12} md={12} xl={12}>
                    <Field label="Estado" name="status" component={TextBase} disabled={true}/>
                  </Grid>
                </Grid>
                <Grid container direction="row" style={{ paddingTop: 30 }} justify="flex-end">
                  <Grid item>
                    <ButtonSave disabled={isSubmitting} />
                    <ButtonBase onClick={() => setOpenModal(false)} label="Cancelar" style={{ marginLeft: 15 }} />
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

WorkOrderDetails.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  work_order_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  appInfo: PropTypes.func.isRequired,
  setOpenModal: PropTypes.func.isRequired,
  appSuccess: PropTypes.func.isRequired,
  appError: PropTypes.func.isRequired,
  doGet: PropTypes.func.isRequired,
  doPut: PropTypes.func.isRequired,
  doPost: PropTypes.func.isRequired,
  refreshData: PropTypes.oneOfType([PropTypes.object])
};

export default withApi(withNotification(WorkOrderDetails));
