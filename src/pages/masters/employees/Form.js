import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid,  } from '@mui/material';
import { Form, Field, Formik } from 'formik';
import * as Yup from 'yup';
import { SelectBase, TextBase, TextAreaBase, Loader } from 'components';
import endPoints from 'endPoints/endPoints';
import messages from 'constantes/messages';
import { withApi, withNotification } from 'wrappers';
import { FormButtons } from 'components/controls';
import { useNavigate } from 'react-router';
import { Box } from '@mui/system';
import { getStatusLabel, getStatusValue } from 'utils/formHelpers';
import DatePickerBase from 'components/pickers/DatePickerBase';

const validationSchema = Yup.object({
   	document_type: Yup.string().required('Tipo de documento es requerido'),
	code: Yup.string().required('Numero es requerido'),
	name: Yup.string().required('Nombres es requerido'),
	image: Yup.string().required('Imagen es requerido'),
	gender: Yup.string().required('Genero es requerido'),
	marital_status: Yup.string().required('Estado Civil es requerido'),
	date_of_birth: Yup.string().required('Fecha de Nacimiento es requerido'),
	address1: Yup.string().required('Direccion 1 es requerido'),
	address2: Yup.string().required('Direccion 2 es requerido'),
	phone: Yup.string().required('Telefono es requerido'),
	cellphone: Yup.string().required('Celular es requerido'),
	email: Yup.string().required('E-Mail es requerido'),
	job_title: Yup.string().required('Cargo es requerido'),
	status: Yup.string().required('Estado es requerido'),
 
});

const urlBase = endPoints.masters.employees.base;

let document_typeList = [{"label":"DNI","value":"DNI"},{"label":"RUC","value":"RUC"},{"label":"TI","value":"TI"},{"label":"CEDULA","value":"CEDULA"}];
let genderList = [{"label":"Masculino","value":"Masculino"},{"label":"Femenino","value":"Femenino"},{"label":"No binario","value":"No binario"},{"label":"Prefiero no especificar","value":"Prefiero no especificar"}];
let marital_statusList = [{"label":"Soltero(a)","value":"Soltero(a)"},{"label":"Casado(a)","value":"Casado(a)"},{"label":"Union Libre","value":"Union Libre"},{"label":"Separado(a)","value":"Separado(a)"},{"label":"Divorciado(a)","value":"Divorciado(a)"},{"label":"Viudo(a)","value":"Viudo(a)"}];


const baseUrl = '/app/general/masters/employees';

const initState = {
    	document_type: "",
	code: false,
	name: false,
	image: false,
	gender: "",
	marital_status: "",
	date_of_birth: false,
	address1: false,
	address2: false,
	phone: false,
	cellphone: false,
	email: false,
	job_title: false,
	status: 1,

};

const selectMap = (data) => {
    return data.map((row) => ({ value: row.id, label: row.name }));
};

const EmployeesForm = ({
    id,
    doGet,
    genericException,
    appSuccess,
    doPost,
    doPut,
    appInfo,
    setEditable,
    viewMode,
    refresh,
    }) => {
    const navigate = useNavigate();
    const [state, setState] = useState(initState);
    const [isLoading, setLoading] = useState(true);

    // Call to API for load form values
    const loadFields = useCallback(async () => {
    const params = {
        url: endPoints.masters.employees.initForm,
        data: id ? { id: id } : {}
    };
    const resp = await doGet(params);
    return resp;
    }, [doGet, id, refresh, setEditable]);

    const init = useCallback(async () => {
    try {
        const { employees,  } = await loadFields();


        const {
document_type, code, name, image, gender, marital_status, date_of_birth, address1, address2, phone, cellphone, email, job_title, status, 
        } = employees;

        setState({
			document_type: document_type || "",
			code: code || "",
			name: name || "",
			image: image || "",
			gender: gender || "",
			marital_status: marital_status || "",
			date_of_birth: date_of_birth || "",
			address1: address1 || "",
			address2: address2 || "",
			phone: phone || "",
			cellphone: cellphone || "",
			email: email || "",
			job_title: job_title || "",
			status: getStatusLabel(status) || "Activo",

        });

        setLoading(false);
    } catch (error) {
        console.log('ERROR AL INICIAR'+error);
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
        const { document_type, code, name, image, gender, marital_status, date_of_birth, address1, address2, phone, cellphone, email, job_title, status,  } = values;
        return {
document_type, code, name, image, gender, marital_status, date_of_birth, address1, address2, phone, cellphone, email, job_title, status: getStatusValue(status), 
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
                redirectEdit(resp.response.data.id);
            } else {
                appSuccess(messages.crud.new);
                redirectEdit(resp.response.data.id);
            }
        } catch (error) {
            console.log('ERROR AL GUARDAR '+error);
            genericException(error);
        }
    };

    return (
    <>
        {isLoading ? (
            <Box p={10}>
                <Loader />
            </Box>
        ) : (
            <Formik enableReinitialize initialValues={state} validationSchema={validationSchema} onSubmit={submit}>
                {(subProps) => (
                <Form>
                    {!id && viewMode ? (
                    <FormButtons formProps={subProps} />
                    ) : (
                    <FormButtons formProps={subProps} />
                    )}
                    <Grid container direction="row" spacing={2}>
    
                        <Grid item xs={12} md={6} xl={6}>
                            <Field label="Tipo de documento" name="document_type" component={SelectBase}  items={document_typeList} />
                        </Grid>
            
                        <Grid item xs={6} md={6} xl={6}>
                            <Field label="Numero" name="code" component={TextBase} 
                                //onClick={(event) => handleChangecode(event)} 
                            />
                        </Grid>
            
                        <Grid item xs={6} md={6} xl={6}>
                            <Field label="Nombres" name="name" component={TextBase} 
                                //onClick={(event) => handleChangename(event)} 
                            />
                        </Grid>
            
                        <Grid item xs={6} md={6} xl={6}>
                            <Field label="Imagen" name="image" component={TextBase} 
                                //onClick={(event) => handleChangeimage(event)} 
                            />
                        </Grid>
            
                        <Grid item xs={12} md={6} xl={6}>
                            <Field label="Genero" name="gender" component={SelectBase}  items={genderList} />
                        </Grid>
            
                        <Grid item xs={12} md={6} xl={6}>
                            <Field label="Estado Civil" name="marital_status" component={SelectBase}  items={marital_statusList} />
                        </Grid>
            
                        <Grid item xs={6} md={6} xl={6}>
                            <Field label="Fecha de Nacimiento" name="date_of_birth" component={DatePickerBase} 
                                //onClick={(event) => handleChangedate_of_birth(event)} 
                            />
                        </Grid>
            
                        <Grid item xs={6} md={6} xl={6}>
                            <Field label="Direccion 1" name="address1" component={TextBase} 
                                //onClick={(event) => handleChangeaddress1(event)} 
                            />
                        </Grid>
            
                        <Grid item xs={6} md={6} xl={6}>
                            <Field label="Direccion 2" name="address2" component={TextAreaBase} 
                                //onClick={(event) => handleChangeaddress2(event)} 
                            />
                        </Grid>
            
                        <Grid item xs={6} md={6} xl={6}>
                            <Field label="Telefono" name="phone" component={TextBase} 
                                //onClick={(event) => handleChangephone(event)} 
                            />
                        </Grid>
            
                        <Grid item xs={6} md={6} xl={6}>
                            <Field label="Celular" name="cellphone" component={TextBase} 
                                //onClick={(event) => handleChangecellphone(event)} 
                            />
                        </Grid>
            
                        <Grid item xs={6} md={6} xl={6}>
                            <Field label="E-Mail" name="email" component={TextBase} 
                                //onClick={(event) => handleChangeemail(event)} 
                            />
                        </Grid>
            
                        <Grid item xs={6} md={6} xl={6}>
                            <Field label="Cargo" name="job_title" component={TextBase} 
                                //onClick={(event) => handleChangejob_title(event)} 
                            />
                        </Grid>
            
                        <Grid item xs={12} md={6} xl={6}>
                            <Field label="Estado" name="status" component={TextBase} disabled={true} />
                        </Grid>
            
                    </Grid>
                </Form>
                )}
            </Formik>
        )}
    </>
    );
};

EmployeesForm.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    doPost: PropTypes.func,
    doGet: PropTypes.func,
    doPut: PropTypes.func,
    appInfo: PropTypes.func.isRequired,
    appSuccess: PropTypes.func.isRequired,
    genericException: PropTypes.func.isRequired,
    setEditable: PropTypes.func,
    refresh: PropTypes.oneOfType([PropTypes.object])
};

export default withApi(withNotification(EmployeesForm));