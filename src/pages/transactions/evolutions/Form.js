import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid,  } from '@mui/material';
import { Form, Field, Formik } from 'formik';
import * as Yup from 'yup';
import { TextBase, SelectBase,  Loader } from 'components';
import endPoints from 'endPoints/endPoints';
import messages from 'constantes/messages';
import { withApi, withNotification } from 'wrappers';
import { FormButtons } from 'components/controls';
import { useNavigate } from 'react-router';
import { Box } from '@mui/system';
import { getStatusLabel, getStatusValue } from 'utils/formHelpers';
import DatePickerBase from 'components/pickers/DatePickerBase';

const validationSchema = Yup.object({
   	code: Yup.string().required('Codigo es requerido'),
	patient_id: Yup.string().required('Paciente es requerido'),
	employee_id: Yup.string().required('Empleado es requerido'),
	date_of_evolution: Yup.string().required('Fecha de registro es requerido'),
	area: Yup.string().required('Area que registra evolucion es requerido'),
	comments: Yup.string().required('Notas es requerido'),
	status: Yup.string().required('Estado es requerido'),
 
});

const urlBase = endPoints.transactions.evolutions.base;

let patientList = [];
let employeeList = [];


const baseUrl = '/app/general/transactions/evolutions';

const initState = {
    	code: false,
	patient_id: null,
	employee_id: null,
	date_of_evolution: false,
	area: false,
	comments: false,
	status: 1,

};

const selectMap = (data) => {
    return data.map((row) => ({ value: row.id, label: row.name }));
};

const EvolutionsForm = ({
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
        url: endPoints.transactions.evolutions.initForm,
        data: id ? { id: id } : {}
    };
    const resp = await doGet(params);
    return resp;
    }, [doGet, id, refresh, setEditable]);

    const init = useCallback(async () => {
    try {
        const { evolutions, patient, employee,  } = await loadFields();
patientList = selectMap(patient);
employeeList = selectMap(employee);


        const {
code, patient_id, employee_id, date_of_evolution, area, comments, status, 
        } = evolutions;

        setState({
			code: code || "",
			patient_id: patient_id || null,
			employee_id: employee_id || null,
			date_of_evolution: date_of_evolution || "",
			area: area || "",
			comments: comments || "",
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
        const { code, patient_id, employee_id, date_of_evolution, area, comments, status,  } = values;
        return {
code, patient_id, employee_id, date_of_evolution, area, comments, status: getStatusValue(status), 
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
    
                        <Grid item xs={6} md={6} xl={6}>
                            <Field label="Codigo" name="code" component={TextBase} 
                                //onClick={(event) => handleChangecode(event)} 
                            />
                        </Grid>
            
                                <Grid item xs={6} md={6} xl={6}>
                                    <Field label="Paciente" name="patient_id" component={SelectBase} items={patientList}  
                                        /*onOptionSelected={(selectedOption) => handleOnChangepatient_id(selectedOption, subProps)} */
                                    />
                                </Grid>
                    
                                <Grid item xs={6} md={6} xl={6}>
                                    <Field label="Empleado" name="employee_id" component={SelectBase} items={employeeList}  
                                        /*onOptionSelected={(selectedOption) => handleOnChangeemployee_id(selectedOption, subProps)} */
                                    />
                                </Grid>
                    
                        <Grid item xs={6} md={6} xl={6}>
                            <Field label="Fecha de registro" name="date_of_evolution" component={DatePickerBase} 
                                //onClick={(event) => handleChangedate_of_evolution(event)} 
                            />
                        </Grid>
            
                        <Grid item xs={6} md={6} xl={6}>
                            <Field label="Area que registra evolucion" name="area" component={TextBase} 
                                //onClick={(event) => handleChangearea(event)} 
                            />
                        </Grid>
            
                        <Grid item xs={6} md={6} xl={6}>
                            <Field label="Notas" name="comments" component={TextBase} 
                                //onClick={(event) => handleChangecomments(event)} 
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

EvolutionsForm.propTypes = {
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

export default withApi(withNotification(EvolutionsForm));