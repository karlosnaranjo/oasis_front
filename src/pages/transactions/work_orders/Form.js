import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import { Form, Field, Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import { TextBase, TextAreaBase, SelectBase, Loader } from "components";
import endPoints from "endPoints/endPoints";
import messages from "constantes/messages";
import { withApi, withNotification } from "wrappers";
import { FormButtons } from "components/controls";
import { getStatusLabel, getStatusValue } from "utils/formHelpers";
import DatePickerBase from "components/pickers/DatePickerBase";

const validationSchema = Yup.object({
  third_party_id: Yup.string().required("El cliente es obligatorio"),
  product_id: Yup.string().required("El producto es obligatorio"),
});

const stateInit = {
  isLoading: true,
  order_number: "",
  issue_date: "",
  due_date: "",
  description: "",
  plant_layout_id: null,
  third_party_id: null,
  product_id: null,
  instructions: "",
  tag_id: null,
  status: true,
};

let defaultPlantList = [];
let thirdPartyList = [];
let productList = [];
let tagList = [];

const baseUrl = "/app/general/transacctions/work_orders";

function WorkOrdersForm(props) {
  const [state, setState] = useState(stateInit);
  const navigate = useNavigate();

  const selectMap = useCallback(
    (data, campo = "description") =>
      data.map((row) => ({ value: row.id, label: row[campo] })),
    []
  );

  const loadInitForm = useCallback(
    async (id = null) => {
      const url = endPoints.transactions.workOrders.initForm;
      const data = { id: id || "" };
      const resp = await props.doGet({ url, data });
      return resp;
    },
    [props]
  );

  const redirectEdit = (idModel) => {
    navigate(`${baseUrl}/edit/${idModel}`, { replace: true, idModel });
  };

  const init = useCallback(async () => {
    const { id } = props;
    try {
      const resp = await loadInitForm(id);
      const { work_order, third_parties, products, tags, plant_layouts } =
        resp || {};

      const {
        order_number,
        issue_date,
        due_date,
        description,
        plant_layout_id,
        third_party_id,
        product_id,
        instructions,
        tag_id,
        status,
      } = work_order || {};

      defaultPlantList = selectMap(plant_layouts);
      thirdPartyList = selectMap(third_parties, "name");
      productList = selectMap(products);
      tagList = selectMap(tags);

      setState({
        order_number: order_number || "",
        issue_date: issue_date || "",
        due_date: due_date || "",
        description: description || "",
        plant_layout_id: plant_layout_id || null,
        third_party_id: third_party_id || null,
        product_id: product_id || null,
        instructions: instructions || "",
        tag_id: tag_id || null,
        status: getStatusLabel(status) || "Activo",
      });
    } catch (error) {
      props.genericException(error);
    }
  }, [props, loadInitForm]);

  useEffect(() => {
    init();
  }, [init]);

  const submitForm = async (values) => {
    const { id, doPost, doPut } = props;
    const params = {};
    const {
      order_number,
      issue_date,
      due_date,
      description,
      plant_layout_id,
      third_party_id,
      product_id,
      instructions,
      tag_id,
      status,
    } = values;
    const dataValue = {
      order_number,
      issue_date,
      due_date,
      description,
      plant_layout_id,
      third_party_id,
      product_id,
      instructions,
      tag_id,
      status: getStatusValue(status),
    };

    params.url = id
      ? `${endPoints.transactions.workOrders.base}/${id}`
      : endPoints.transactions.workOrders.base;
    params.data = dataValue;
    const metodo = id ? doPut : doPost;
    const resp = await metodo(params);
    try {
      if (id) {
        props.appInfo(messages.crud.update);
      } else {
        props.appSuccess(messages.crud.new);
        redirectEdit(resp.response.data.id);
      }
    } catch (error) {
      props.genericException(error);
    }
  };

  const {
    isLoading,
    order_number,
    issue_date,
    due_date,
    description,
    plant_layout_id,
    third_party_id,
    product_id,
    instructions,
    tag_id,
    status,
  } = state;
  return isLoading ? (
    <Loader />
  ) : (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          order_number,
          issue_date,
          due_date,
          description,
          plant_layout_id,
          third_party_id,
          product_id,
          instructions,
          tag_id,
          status,
        }}
        validationSchema={validationSchema}
        onSubmit={submitForm}
      >
        {(subProps) => (
          <Form>
            <FormButtons formProps={subProps} />

            <Grid container direction="row" spacing={2}>
              <Grid container item spacing={2}>
                <Grid item xs={6} md={6} xl={6}>
                  <Field
                    label="Orden No."
                    name="order_number"
                    component={TextBase}
                  />
                </Grid>
                <Grid item xs={6} md={6} xl={6}>
                  <Field
                    label="Fecha de Elaboración"
                    name="issue_date"
                    component={DatePickerBase}
                  />
                </Grid>
                <Grid item xs={6} md={6} xl={6}>
                  <Field
                    label="Fecha Est. Entrega"
                    name="due_date"
                    component={DatePickerBase}
                  />
                </Grid>
                <Grid item xs={6} md={6} xl={6}>
                  <Field
                    label="Nombre"
                    name="description"
                    component={TextBase}
                  />
                </Grid>
                <Grid item xs={6} md={6} xl={6}>
                  <Field
                    label="Cliente"
                    name="third_party_id"
                    component={SelectBase}
                    items={thirdPartyList}
                  />
                </Grid>
                <Grid item xs={6} md={6} xl={6}>
                  <Field
                    label="Producto"
                    name="product_id"
                    component={SelectBase}
                    items={productList}
                  />
                </Grid>
                <Grid item xs={6} md={6} xl={6}>
                  <Field
                    label="Planta sugerida"
                    name="plant_layout_id"
                    component={SelectBase}
                    items={defaultPlantList}
                  />
                </Grid>
                <Grid item xs={6} md={6} xl={6}>
                  <Field
                    label="Tag"
                    name="tag_id"
                    component={SelectBase}
                    items={tagList}
                  />
                </Grid>
                <Grid item xs={12} md={12} xl={12}>
                  <Field
                    label="Instrucciones"
                    name="instructions"
                    component={TextAreaBase}
                  />
                </Grid>

                <Grid item xs={6} md={6} xl={6}>
                  <Field
                    label="status"
                    name="status"
                    component={TextBase}
                    disabled={true}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
}

WorkOrdersForm.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  doPut: PropTypes.func,
  doPost: PropTypes.func,
  doGet: PropTypes.func,
  appInfo: PropTypes.func.isRequired,
  appSuccess: PropTypes.func.isRequired,
  genericException: PropTypes.func.isRequired,
};

export default withApi(withNotification(WorkOrdersForm));
