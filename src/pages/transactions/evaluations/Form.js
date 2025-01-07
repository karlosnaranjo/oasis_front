import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, } from '@mui/material';
import { Form, Field, Formik } from 'formik';
import * as Yup from 'yup';
import { TextBase, SelectBase, Loader } from 'components';
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
    creation_date: Yup.string().required('Fecha de Creacion es requerido'),
    phase_id: Yup.string().required('Fase es requerido'),
    target_id: Yup.string().required('Objetivo es requerido'),
    start_date: Yup.string().required('Fecha inicio es requerido'),
    end_date: Yup.string().required('Fecha final es requerido'),
    clinical_team: Yup.string().required('Apreciacion Equipo Clinico es requerido'),
    achievement: Yup.string().required('Logros y Dificultades es requerido'),
    strategy: Yup.string().required('Estrategias Utilizadas es requerido'),
    requirement: Yup.string().required('Exigencias es requerido'),
    test: Yup.string().required('Evaluacion es requerido'),
    status: Yup.string().required('Estado es requerido'),

});

const urlBase = endPoints.transactions.evaluations.base;
const targetsByPhaseUrl = `${urlBase}/targets-by-phase`;

let patientList = [];
let phaseList = [];
let targetList = [];
let testList = [{ "label": "Positivo", "value": "Positivo" }, { "label": "Negativo", "value": "Negativo" }, { "label": "Observacion", "value": "Observacion" }];


const baseUrl = '/app/general/transactions/evaluations';

const initState = {
    code: false,
    patient_id: null,
    creation_date: false,
    phase_id: null,
    target_id: null,
    start_date: false,
    end_date: false,
    clinical_team: false,
    achievement: false,
    strategy: false,
    requirement: false,
    test: "",
    status: 1,

};

const selectMap = (data) => {
    return data.map((row) => ({ value: row.id, label: row.name }));
};

const EvaluationsForm = ({
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
            url: endPoints.transactions.evaluations.initForm,
            data: id ? { id: id } : {}
        };
        const resp = await doGet(params);
        return resp;
    }, [doGet, id, refresh, setEditable]);

    const init = useCallback(async () => {
        try {
            const { evaluations, patient, phase, target, } = await loadFields();
            patientList = selectMap(patient);
            phaseList = selectMap(phase);
            targetList = selectMap(target);


            const {
                code, patient_id, creation_date, phase_id, target_id, start_date, end_date, clinical_team, achievement, strategy, requirement, test, status,
            } = evaluations;

            setState({
                code: code || "Automático",
                patient_id: patient_id || null,
                creation_date: creation_date || "",
                phase_id: phase_id || null,
                target_id: target_id || null,
                start_date: start_date || "",
                end_date: end_date || "",
                clinical_team: clinical_team || "",
                achievement: achievement || "",
                strategy: strategy || "",
                requirement: requirement || "",
                test: test || "",
                status: getStatusLabel(status) || "Activo",

            });

            setLoading(false);
        } catch (error) {
            console.log('ERROR AL INICIAR' + error);
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
        const { code, patient_id, creation_date, phase_id, target_id, start_date, end_date, clinical_team, achievement, strategy, requirement, test, status, } = values;
        return {
            code, patient_id, creation_date, phase_id, target_id, start_date, end_date, clinical_team, achievement, strategy, requirement, test, status: getStatusValue(status),
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
            console.log('ERROR AL GUARDAR ' + error);
            genericException(error);
        }
    };

    const handlePhaseChange = async (selectedOption, formikProps) => {
        try {
            if (selectedOption) {
                const params = {
                    url: targetsByPhaseUrl,
                    data: { phase_id: selectedOption }
                };
                const resp = await doGet(params);
                targetList = selectMap(resp.targets);
                formikProps.setFieldValue('target_id', null);
            } else {
                targetList = [];
                formikProps.setFieldValue('target_id', null);
            }
        } catch (error) {
            console.log('ERROR AL CARGAR OBJETIVOS ' + error);
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
                                        disabled={true}
                                        InputProps={{
                                            readOnly: true
                                        }}
                                    //onClick={(event) => handleChangecode(event)} 
                                    />
                                </Grid>

                                <Grid item xs={6} md={6} xl={6}>
                                    <Field label="Paciente" name="patient_id" component={SelectBase} items={patientList}
                                    /*onOptionSelected={(selectedOption) => handleOnChangepatient_id(selectedOption, subProps)} */
                                    />
                                </Grid>

                                <Grid item xs={6} md={6} xl={6}>
                                    <Field label="Fecha de Creacion" name="creation_date" component={DatePickerBase}
                                    //onClick={(event) => handleChangecreation_date(event)} 
                                    />
                                </Grid>

                                <Grid item xs={6} md={6} xl={6}>
                                    <Field label="Fase" name="phase_id" component={SelectBase} items={phaseList}
                                        onOptionSelected={(selectedOption) => handlePhaseChange(selectedOption, subProps)}
                                    />
                                </Grid>

                                <Grid item xs={6} md={6} xl={6}>
                                    <Field label="Objetivo" name="target_id" component={SelectBase} items={targetList}
                                    /*onOptionSelected={(selectedOption) => handleOnChangetarget_id(selectedOption, subProps)} */
                                    />
                                </Grid>

                                <Grid item xs={6} md={6} xl={6}>
                                    <Field label="Fecha inicio" name="start_date" component={DatePickerBase}
                                    //onClick={(event) => handleChangestart_date(event)} 
                                    />
                                </Grid>

                                <Grid item xs={6} md={6} xl={6}>
                                    <Field label="Fecha final" name="end_date" component={DatePickerBase}
                                    //onClick={(event) => handleChangeend_date(event)} 
                                    />
                                </Grid>

                                <Grid item xs={6} md={6} xl={6}>
                                    <Field label="Apreciacion Equipo Clinico" name="clinical_team" component={TextBase}
                                    //onClick={(event) => handleChangeclinical_team(event)} 
                                    />
                                </Grid>

                                <Grid item xs={6} md={6} xl={6}>
                                    <Field label="Logros y Dificultades" name="achievement" component={TextBase}
                                    //onClick={(event) => handleChangeachievement(event)} 
                                    />
                                </Grid>

                                <Grid item xs={6} md={6} xl={6}>
                                    <Field label="Estrategias Utilizadas" name="strategy" component={TextBase}
                                    //onClick={(event) => handleChangestrategy(event)} 
                                    />
                                </Grid>

                                <Grid item xs={6} md={6} xl={6}>
                                    <Field label="Exigencias" name="requirement" component={TextBase}
                                    //onClick={(event) => handleChangerequirement(event)} 
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} xl={6}>
                                    <Field label="Evaluacion" name="test" component={SelectBase} items={testList} />
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

EvaluationsForm.propTypes = {
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

export default withApi(withNotification(EvaluationsForm));