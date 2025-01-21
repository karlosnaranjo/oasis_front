import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, } from '@mui/material';
import { Form, Field, Formik } from 'formik';
import * as Yup from 'yup';
import { TextBase, TextAreaBase, SelectBase, Loader } from 'components';
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
    issue_date: Yup.string().required('Fecha de Elaboracion es requerido'),
    patient_id: Yup.string().required('Paciente es requerido'),
    reason_of_visit: Yup.string().required('Motivo de consulta es requerido'),
    family_history: Yup.string().required('Antecedentes familiares es requerido'),
    work_history: Yup.string().required('Antecedentes laborales es requerido'),
    personal_history: Yup.string().required('Historia personal es requerido'),
    addiction_history: Yup.string().required('Historia de adiccion es requerido'),
    way_administration: Yup.string().required('Via de administracion es requerido'),
    other_substances: Yup.string().required('Otras subtancias es requerido'),
    highest_substance: Yup.string().required('Mayor sustancia es requerido'),
    current_consumption: Yup.string().required('Consumo actual es requerido'),
    addictive_behavior: Yup.string().required('Esta realizando la conducta adictiva? es requerido'),
    previous_treatment: Yup.string().required('Tratamientos anteriores es requerido'),
    place_treatment: Yup.string().required('Lugares y tiempos de tratamiento es requerido'),
    mental_illness: Yup.string().required('Historia de enfermedad mental es requerido'),
    suicidal_thinking: Yup.string().required('Ha tenido pensamientos o intentos de suicidio? es requerido'),
    homicidal_attempts: Yup.string().required('Ha tenido pensamientos o intentos homicidas? es requerido'),
    language: Yup.string().required('Lenguaje y pensamiento es requerido'),
    orientation: Yup.string().required('Orientacion (Persona, espacio y tiempo): es requerido'),
    memory: Yup.string().required('Memoria es requerido'),
    mood: Yup.string().required('Estado de animo es requerido'),
    feeding: Yup.string().required('Alimentacion es requerido'),
    sleep: Yup.string().required('Sueno es requerido'),
    medication: Yup.string().required('Esta tomando algun tipo de medicamento? es requerido'),
    legal_issues: Yup.string().required('Problematicas judiciales y/o comportamentales es requerido'),
    defense_mechanism: Yup.string().required('Mecanismos de defensa es requerido'),
    another_difficulty: Yup.string().required('Otras dificultades es requerido'),
    expectation: Yup.string().required('Que expectativas y motivaciones tiene para el proceso? es requerido'),
    diagnostic_impression: Yup.string().required('Impresion diagnostica es requerido'),
    intervention: Yup.string().required('Propuesta de intervencion es requerido'),
    comments: Yup.string().required('Observaciones es requerido'),
    employee_id: Yup.string().required('Funcionario es requerido'),
    status: Yup.string().required('Estado es requerido'),

});

const urlBase = endPoints.transactions.psychologies.base;

let patientList = [];
let current_consumptionList = [{ "label": "SI", "value": "SI" }, { "label": "NO", "value": "NO" }];
let addictive_behaviorList = [{ "label": "SI", "value": "SI" }, { "label": "NO", "value": "NO" }];
let previous_treatmentList = [{ "label": "SI", "value": "SI" }, { "label": "NO", "value": "NO" }];
let employeeList = [];


const baseUrl = '/app/general/transactions/psychologies';

const initState = {
    code: false,
    issue_date: false,
    patient_id: null,
    reason_of_visit: false,
    family_history: false,
    work_history: false,
    personal_history: false,
    addiction_history: false,
    way_administration: false,
    other_substances: false,
    highest_substance: false,
    current_consumption: "",
    addictive_behavior: "",
    previous_treatment: "",
    place_treatment: false,
    mental_illness: false,
    suicidal_thinking: false,
    homicidal_attempts: false,
    language: false,
    orientation: false,
    memory: false,
    mood: false,
    feeding: false,
    sleep: false,
    medication: false,
    legal_issues: false,
    defense_mechanism: false,
    another_difficulty: false,
    expectation: false,
    diagnostic_impression: false,
    intervention: false,
    comments: false,
    employee_id: null,
    status: 1,

};

const selectMap = (data) => {
    return data.map((row) => ({ value: row.id, label: row.name }));
};

const PsychologiesForm = ({
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
            url: endPoints.transactions.psychologies.initForm,
            data: id ? { id: id } : {}
        };
        const resp = await doGet(params);
        return resp;
    }, [doGet, id, refresh, setEditable]);

    const init = useCallback(async () => {
        try {
            const { psychologies, patient, employee, } = await loadFields();
            patientList = selectMap(patient);
            employeeList = selectMap(employee);


            const {
                code, issue_date, patient_id, reason_of_visit, family_history, work_history, personal_history, addiction_history, way_administration, other_substances, highest_substance, current_consumption, addictive_behavior, previous_treatment, place_treatment, mental_illness, suicidal_thinking, homicidal_attempts, language, orientation, memory, mood, feeding, sleep, medication, legal_issues, defense_mechanism, another_difficulty, expectation, diagnostic_impression, intervention, comments, employee_id, status,
            } = psychologies;

            setState({
                code: code || "Automático",
                issue_date: issue_date || "",
                patient_id: patient_id || null,
                reason_of_visit: reason_of_visit || "",
                family_history: family_history || "",
                work_history: work_history || "",
                personal_history: personal_history || "",
                addiction_history: addiction_history || "",
                way_administration: way_administration || "",
                other_substances: other_substances || "",
                highest_substance: highest_substance || "",
                current_consumption: current_consumption || "",
                addictive_behavior: addictive_behavior || "",
                previous_treatment: previous_treatment || "",
                place_treatment: place_treatment || "",
                mental_illness: mental_illness || "",
                suicidal_thinking: suicidal_thinking || "",
                homicidal_attempts: homicidal_attempts || "",
                language: language || "",
                orientation: orientation || "",
                memory: memory || "",
                mood: mood || "",
                feeding: feeding || "",
                sleep: sleep || "",
                medication: medication || "",
                legal_issues: legal_issues || "",
                defense_mechanism: defense_mechanism || "",
                another_difficulty: another_difficulty || "",
                expectation: expectation || "",
                diagnostic_impression: diagnostic_impression || "",
                intervention: intervention || "",
                comments: comments || "",
                employee_id: employee_id || null,
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
        const { code, issue_date, patient_id, reason_of_visit, family_history, work_history, personal_history, addiction_history, way_administration, other_substances, highest_substance, current_consumption, addictive_behavior, previous_treatment, place_treatment, mental_illness, suicidal_thinking, homicidal_attempts, language, orientation, memory, mood, feeding, sleep, medication, legal_issues, defense_mechanism, another_difficulty, expectation, diagnostic_impression, intervention, comments, employee_id, status, } = values;
        return {
            code, issue_date, patient_id, reason_of_visit, family_history, work_history, personal_history, addiction_history, way_administration, other_substances, highest_substance, current_consumption, addictive_behavior, previous_treatment, place_treatment, mental_illness, suicidal_thinking, homicidal_attempts, language, orientation, memory, mood, feeding, sleep, medication, legal_issues, defense_mechanism, another_difficulty, expectation, diagnostic_impression, intervention, comments, employee_id, status: getStatusValue(status),
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
                                    <Field label="Fecha de Elaboracion" name="issue_date" component={DatePickerBase}
                                    //onClick={(event) => handleChangeissue_date(event)} 
                                    />
                                </Grid>

                                <Grid item xs={6} md={6} xl={6}>
                                    <Field label="Paciente" name="patient_id" component={SelectBase} items={patientList}
                                    /*onOptionSelected={(selectedOption) => handleOnChangepatient_id(selectedOption, subProps)} */
                                    />
                                </Grid>

                                <Grid item xs={12} md={12} xl={12}>
                                    <Field label="Motivo de consulta" name="reason_of_visit" component={TextAreaBase}
                                    //onClick={(event) => handleChangereason_of_visit(event)} 
                                    />
                                </Grid>

                                <Grid item xs={12} md={12} xl={12}>
                                    <Field label="Antecedentes familiares" name="family_history" component={TextAreaBase}
                                    //onClick={(event) => handleChangefamily_history(event)} 
                                    />
                                </Grid>

                                <Grid item xs={12} md={12} xl={12}>
                                    <Field label="Antecedentes laborales" name="work_history" component={TextAreaBase}
                                    //onClick={(event) => handleChangework_history(event)} 
                                    />
                                </Grid>

                                <Grid item xs={12} md={12} xl={12}>
                                    <Field label="Historia personal" name="personal_history" component={TextAreaBase}
                                    //onClick={(event) => handleChangepersonal_history(event)} 
                                    />
                                </Grid>

                                <Grid item xs={12} md={12} xl={12}>
                                    <Field label="Historia de adiccion" name="addiction_history" component={TextAreaBase}
                                    //onClick={(event) => handleChangeaddiction_history(event)} 
                                    />
                                </Grid>

                                <Grid item xs={12} md={12} xl={12}>
                                    <Field label="Via de administración" name="way_administration" component={TextAreaBase}
                                    //onClick={(event) => handleChangeway_administration(event)} 
                                    />
                                </Grid>

                                <Grid item xs={12} md={12} xl={12}>
                                    <Field label="Otras sustancias" name="other_substances" component={TextAreaBase}
                                    //onClick={(event) => handleChangeother_substances(event)} 
                                    />
                                </Grid>

                                <Grid item xs={12} md={12} xl={12}>
                                    <Field label="Mayor sustancia" name="highest_substance" component={TextAreaBase}
                                    //onClick={(event) => handleChangehighest_substance(event)} 
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} xl={6}>
                                    <Field label="Consumo actual" name="current_consumption" component={SelectBase} items={current_consumptionList} />
                                </Grid>

                                <Grid item xs={12} md={6} xl={6}>
                                    <Field label="Esta realizando la conducta adictiva?" name="addictive_behavior" component={SelectBase} items={addictive_behaviorList} />
                                </Grid>

                                <Grid item xs={12} md={6} xl={6}>
                                    <Field label="Tratamientos anteriores" name="previous_treatment" component={SelectBase} items={previous_treatmentList} />
                                </Grid>

                                <Grid item xs={12} md={12} xl={12}>
                                    <Field label="Lugares y tiempos de tratamiento" name="place_treatment" component={TextAreaBase}
                                    //onClick={(event) => handleChangeplace_treatment(event)} 
                                    />
                                </Grid>

                                <Grid item xs={12} md={12} xl={12}>
                                    <Field label="Historia de enfermedad mental" name="mental_illness" component={TextAreaBase}
                                    //onClick={(event) => handleChangemental_illness(event)} 
                                    />
                                </Grid>

                                <Grid item xs={12} md={12} xl={12}>
                                    <Field label="Ha tenido pensamientos o intentos de suicidio?" name="suicidal_thinking" component={TextAreaBase}
                                    //onClick={(event) => handleChangesuicidal_thinking(event)} 
                                    />
                                </Grid>

                                <Grid item xs={12} md={12} xl={12}>
                                    <Field label="Ha tenido pensamientos o intentos homicidas?" name="homicidal_attempts" component={TextAreaBase}
                                    //onClick={(event) => handleChangehomicidal_attempts(event)} 
                                    />
                                </Grid>

                                <Grid item xs={12} md={12} xl={12}>
                                    <Field label="Lenguaje y pensamiento" name="language" component={TextAreaBase}
                                    //onClick={(event) => handleChangelanguage(event)} 
                                    />
                                </Grid>

                                <Grid item xs={12} md={12} xl={12}>
                                    <Field label="Orientación (Persona, espacio y tiempo):" name="orientation" component={TextAreaBase}
                                    //onClick={(event) => handleChangeorientation(event)} 
                                    />
                                </Grid>

                                <Grid item xs={12} md={12} xl={12}>
                                    <Field label="Memoria" name="memory" component={TextAreaBase}
                                    //onClick={(event) => handleChangememory(event)} 
                                    />
                                </Grid>

                                <Grid item xs={12} md={12} xl={12}>
                                    <Field label="Estado de animo" name="mood" component={TextAreaBase}
                                    //onClick={(event) => handleChangemood(event)} 
                                    />
                                </Grid>

                                <Grid item xs={12} md={12} xl={12}>
                                    <Field label="Alimentación" name="feeding" component={TextAreaBase}
                                    //onClick={(event) => handleChangefeeding(event)} 
                                    />
                                </Grid>

                                <Grid item xs={12} md={12} xl={12}>
                                    <Field label="Sueño" name="sleep" component={TextAreaBase}
                                    //onClick={(event) => handleChangesleep(event)} 
                                    />
                                </Grid>

                                <Grid item xs={12} md={12} xl={12}>
                                    <Field label="Esta tomando algun tipo de medicamento?" name="medication" component={TextAreaBase}
                                    //onClick={(event) => handleChangemedication(event)} 
                                    />
                                </Grid>

                                <Grid item xs={12} md={12} xl={12}>
                                    <Field label="Problematicas judiciales y/o comportamentales" name="legal_issues" component={TextAreaBase}
                                    //onClick={(event) => handleChangelegal_issues(event)} 
                                    />
                                </Grid>

                                <Grid item xs={12} md={12} xl={12}>
                                    <Field label="Mecanismos de defensa" name="defense_mechanism" component={TextAreaBase}
                                    //onClick={(event) => handleChangedefense_mechanism(event)} 
                                    />
                                </Grid>

                                <Grid item xs={12} md={12} xl={12}>
                                    <Field label="Otras dificultades" name="another_difficulty" component={TextAreaBase}
                                    //onClick={(event) => handleChangeanother_difficulty(event)} 
                                    />
                                </Grid>

                                <Grid item xs={12} md={12} xl={12}>
                                    <Field label="Que expectativas y motivaciones tiene para el proceso?" name="expectation" component={TextAreaBase}
                                    //onClick={(event) => handleChangeexpectation(event)} 
                                    />
                                </Grid>

                                <Grid item xs={12} md={12} xl={12}>
                                    <Field label="Impresion diagnostica" name="diagnostic_impression" component={TextAreaBase}
                                    //onClick={(event) => handleChangediagnostic_impression(event)} 
                                    />
                                </Grid>

                                <Grid item xs={12} md={12} xl={12}>
                                    <Field label="Propuesta de intervencion" name="intervention" component={TextAreaBase}
                                    //onClick={(event) => handleChangeintervention(event)} 
                                    />
                                </Grid>

                                <Grid item xs={12} md={12} xl={12}>
                                    <Field label="Observaciones" name="comments" component={TextAreaBase}
                                    //onClick={(event) => handleChangecomments(event)} 
                                    />
                                </Grid>

                                <Grid item xs={6} md={6} xl={6}>
                                    <Field label="Funcionario" name="employee_id" component={SelectBase} items={employeeList}
                                    /*onOptionSelected={(selectedOption) => handleOnChangeemployee_id(selectedOption, subProps)} */
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

PsychologiesForm.propTypes = {
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

export default withApi(withNotification(PsychologiesForm));