import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, } from '@mui/material';
import { Form, Field, Formik } from 'formik';
import * as Yup from 'yup';
import { SelectBase, TextBase, Loader } from 'components';
import { Typography } from '@mui/material';
import endPoints from 'endPoints/endPoints';
import messages from 'constantes/messages';
import { withApi, withNotification } from 'wrappers';
import { FormButtons } from 'components/controls';
import { useNavigate } from 'react-router';
import { Box } from '@mui/system';
import { getStatusLabel, getStatusValue } from 'utils/formHelpers';
import DatePickerBase from 'components/pickers/DatePickerBase';
import UploadAvatar from "components/upload/UploadAvatar";

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
    job_title: Yup.string().required('Ocupacion es requerido'),
    health_insurance: Yup.string().required('EPS es requerido'),
    level_of_education: Yup.string().required('Escolaridad es requerido'),
    admission_date: Yup.string().required('Fecha de Ingreso es requerido'),
    second_date: Yup.string().required('Fecha de Ingreso (por segunda vez) es requerido'),
    third_date: Yup.string().required('Fecha de Ingreso (por tercera vez) es requerido'),
    responsible_adult: Yup.string().required('Acudiente es requerido'),
    responsible_adult_code: Yup.string().required('Documento del acudiente es requerido'),
    relationship: Yup.string().required('Parentesco es requerido'),
    responsible_adult_phone: Yup.string().required('Telefono es requerido'),
    responsible_adult_cellphone: Yup.string().required('Celular es requerido'),
    drug_id: Yup.string().required('Droga de impacto es requerido'),
    orientation: Yup.string().required('Ubicacion (Tiempo - Espacio - Persona) es requerido'),
    body_language: Yup.string().required('Lenguaje corporal es requerido'),
    ideation: Yup.string().required('Ideacion o intento suicida es requerido'),
    delusions: Yup.string().required('Delirios es requerido'),
    hallucinations: Yup.string().required('Alucinaciones es requerido'),
    eating_problems: Yup.string().required('Problemas de alimentacion es requerido'),
    treatment_motivations: Yup.string().required('Motivacion al tratamiento es requerido'),
    end_date: Yup.string().required('Fecha de Salida es requerido'),
    cause_of_end: Yup.string().required('Causa de salida es requerido'),
    end_date_second: Yup.string().required('Fecha de Salida (Por segunda vez) es requerido'),
    cause_of_end_second: Yup.string().required('Causa de salida (Por segunda vez) es requerido'),
    end_date_third: Yup.string().required('Fecha de Salida (Por tercera vez) es requerido'),
    cause_of_end_third: Yup.string().required('Causa de salida (Por tercera vez) es requerido'),
    comments: Yup.string().required('Observaciones es requerido'),
    employee_id: Yup.string().required('Funcionario es requerido'),
    status: Yup.string().required('Estado es requerido'),

});

const urlBase = endPoints.masters.patients.base;

let document_typeList = [{ "label": "DNI", "value": "DNI" }, { "label": "RUC", "value": "RUC" }, { "label": "TI", "value": "TI" }, { "label": "CEDULA", "value": "CEDULA" }];
let genderList = [{ "label": "Masculino", "value": "Masculino" }, { "label": "Femenino", "value": "Femenino" }, { "label": "No binario", "value": "No binario" }, { "label": "Prefiero no especificar", "value": "Prefiero no especificar" }];
let marital_statusList = [{ "label": "Soltero(a)", "value": "Soltero(a)" }, { "label": "Casado(a)", "value": "Casado(a)" }, { "label": "Union Libre", "value": "Union Libre" }, { "label": "Separado(a)", "value": "Separado(a)" }, { "label": "Divorciado(a)", "value": "Divorciado(a)" }, { "label": "Viudo(a)", "value": "Viudo(a)" }];
let drugList = [];
let cause_of_endList = [{ "label": "Egreso", "value": "Egreso" }, { "label": "Abandono", "value": "Abandono" }, { "label": "Fuga", "value": "Fuga" }, { "label": "Remision", "value": "Remision" }, { "label": "Expulsion", "value": "Expulsion" }];
let cause_of_end_secondList = [{ "label": "Egreso", "value": "Egreso" }, { "label": "Abandono", "value": "Abandono" }, { "label": "Fuga", "value": "Fuga" }, { "label": "Remision", "value": "Remision" }, { "label": "Expulsion", "value": "Expulsion" }];
let cause_of_end_thirdList = [{ "label": "Egreso", "value": "Egreso" }, { "label": "Abandono", "value": "Abandono" }, { "label": "Fuga", "value": "Fuga" }, { "label": "Remision", "value": "Remision" }, { "label": "Expulsion", "value": "Expulsion" }];
let employeeList = [];


const baseUrl = '/app/general/masters/patients';

const initState = {
    document_type: "",
    code: false,
    name: false,
    image: null,
    gender: "",
    marital_status: "",
    date_of_birth: false,
    address1: false,
    address2: false,
    phone: false,
    cellphone: false,
    email: false,
    job_title: false,
    health_insurance: false,
    level_of_education: false,
    admission_date: false,
    second_date: false,
    third_date: false,
    responsible_adult: false,
    responsible_adult_code: false,
    relationship: false,
    responsible_adult_phone: false,
    responsible_adult_cellphone: false,
    drug_id: null,
    orientation: false,
    body_language: false,
    ideation: false,
    delusions: false,
    hallucinations: false,
    eating_problems: false,
    treatment_motivations: false,
    end_date: false,
    cause_of_end: "",
    end_date_second: false,
    cause_of_end_second: "",
    end_date_third: false,
    cause_of_end_third: "",
    comments: false,
    employee_id: null,
    status: 1,

};

const selectMap = (data) => {
    return data.map((row) => ({ value: row.id, label: row.name }));
};

const PatientsForm = ({
    id,
    doGet,
    genericException,
    appSuccess,
    doPost,
    doPut,
    doPostFormData,
    appInfo,
    setEditable,
    viewMode,
    refresh,
}) => {
    const navigate = useNavigate();
    const [state, setState] = useState(initState);
    const [isLoading, setLoading] = useState(true);
    const [imagePreview, setImagePreview] = useState(null);

    // Call to API for load form values
    const loadFields = useCallback(async () => {
        const params = {
            url: endPoints.masters.patients.initForm,
            data: id ? { id: id } : {}
        };
        const resp = await doGet(params);
        return resp;
    }, [doGet, id, refresh, setEditable]);

    const init = useCallback(async () => {
        try {
            const { patients, drug, employee, } = await loadFields();
            drugList = selectMap(drug);
            employeeList = selectMap(employee);


            const {
                document_type, code, name, image, gender, marital_status, date_of_birth, address1, address2, phone, cellphone, email, job_title, health_insurance, level_of_education, admission_date, second_date, third_date, responsible_adult, responsible_adult_code, relationship, responsible_adult_phone, responsible_adult_cellphone, drug_id, orientation, body_language, ideation, delusions, hallucinations, eating_problems, treatment_motivations, end_date, cause_of_end, end_date_second, cause_of_end_second, end_date_third, cause_of_end_third, comments, employee_id, status,
            } = patients;

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
                health_insurance: health_insurance || "",
                level_of_education: level_of_education || "",
                admission_date: admission_date || "",
                second_date: second_date || "",
                third_date: third_date || "",
                responsible_adult: responsible_adult || "",
                responsible_adult_code: responsible_adult_code || "",
                relationship: relationship || "",
                responsible_adult_phone: responsible_adult_phone || "",
                responsible_adult_cellphone: responsible_adult_cellphone || "",
                drug_id: drug_id || null,
                orientation: orientation || "",
                body_language: body_language || "",
                ideation: ideation || "",
                delusions: delusions || "",
                hallucinations: hallucinations || "",
                eating_problems: eating_problems || "",
                treatment_motivations: treatment_motivations || "",
                end_date: end_date || "",
                cause_of_end: cause_of_end || "",
                end_date_second: end_date_second || "",
                cause_of_end_second: cause_of_end_second || "",
                end_date_third: end_date_third || "",
                cause_of_end_third: cause_of_end_third || "",
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

    const handleImageChange = (event) => {
        const file = event.currentTarget.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setState((prevState) => ({
                    ...prevState,
                    image: file,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const redirectEdit = (id) => {
        navigate(`${baseUrl}/edit/${id}`, { replace: false });
    };

    const mapValues = (values) => {
        const { document_type, code, name, image, gender, marital_status, date_of_birth, address1, address2, phone, cellphone, email, job_title, health_insurance, level_of_education, admission_date, second_date, third_date, responsible_adult, responsible_adult_code, relationship, responsible_adult_phone, responsible_adult_cellphone, drug_id, orientation, body_language, ideation, delusions, hallucinations, eating_problems, treatment_motivations, end_date, cause_of_end, end_date_second, cause_of_end_second, end_date_third, cause_of_end_third, comments, employee_id, status, } = values;
        return {
            document_type, code, name, image, gender, marital_status, date_of_birth, address1, address2, phone, cellphone, email, job_title, health_insurance, level_of_education, admission_date, second_date, third_date, responsible_adult, responsible_adult_code, relationship, responsible_adult_phone, responsible_adult_cellphone, drug_id, orientation, body_language, ideation, delusions, hallucinations, eating_problems, treatment_motivations, end_date, cause_of_end, end_date_second, cause_of_end_second, end_date_third, cause_of_end_third, comments, employee_id, status: getStatusValue(status),
        };
    };




    const submit = async (valuesForm) => {
        const data = mapValues(valuesForm);

        const formData = new FormData();
        formData.append("image", data.image);
        formData.append("avatar", await getBase64(data.image));

        // Append all other fields to formData
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                formData.append(key, data[key]);
            }
        }

        const params = {
            url: `${urlBase}/${id}`,
            data: formData,
        };

        /* const params = {
            url: id ? `${urlBase}/${id}` : urlBase,
            data: data
        }; */
        const method = id ? doPut : doPost;

        try {
            const resp = await doPostFormData(params);
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
                                    <UploadAvatar
                                        file={
                                            imagePreview || (state.image ? `${state.image}` : null)
                                        }
                                        onDrop={(acceptedFiles) => {
                                            const file = acceptedFiles[0];
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.onloadend = () => {
                                                    setImagePreview(reader.result);
                                                    setState((prevState) => ({
                                                        ...prevState,
                                                        image: file,
                                                    }));
                                                };
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                        accept="image/*"
                                        caption={
                                            <Typography variant="caption">
                                                Cargue la foto del paciente
                                            </Typography>
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} xl={6}>
                                    <Field label="Tipo de documento" name="document_type" component={SelectBase} items={document_typeList} />
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



                                <Grid item xs={12} md={6} xl={6}>
                                    <Field label="Genero" name="gender" component={SelectBase} items={genderList} />
                                </Grid>

                                <Grid item xs={12} md={6} xl={6}>
                                    <Field label="Estado Civil" name="marital_status" component={SelectBase} items={marital_statusList} />
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
                                    <Field label="Direccion 2" name="address2" component={TextBase}
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
                                    <Field label="Ocupacion" name="job_title" component={TextBase}
                                    //onClick={(event) => handleChangejob_title(event)} 
                                    />
                                </Grid>

                                <Grid item xs={6} md={6} xl={6}>
                                    <Field label="EPS" name="health_insurance" component={TextBase}
                                    //onClick={(event) => handleChangehealth_insurance(event)} 
                                    />
                                </Grid>

                                <Grid item xs={6} md={6} xl={6}>
                                    <Field label="Escolaridad" name="level_of_education" component={TextBase}
                                    //onClick={(event) => handleChangelevel_of_education(event)} 
                                    />
                                </Grid>

                                <Grid item xs={6} md={6} xl={6}>
                                    <Field label="Fecha de Ingreso" name="admission_date" component={DatePickerBase}
                                    //onClick={(event) => handleChangeadmission_date(event)} 
                                    />
                                </Grid>

                                <Grid item xs={6} md={6} xl={6}>
                                    <Field label="Fecha de Ingreso (por segunda vez)" name="second_date" component={DatePickerBase}
                                    //onClick={(event) => handleChangesecond_date(event)} 
                                    />
                                </Grid>

                                <Grid item xs={6} md={6} xl={6}>
                                    <Field label="Fecha de Ingreso (por tercera vez)" name="third_date" component={DatePickerBase}
                                    //onClick={(event) => handleChangethird_date(event)} 
                                    />
                                </Grid>

                                <Grid item xs={6} md={6} xl={6}>
                                    <Field label="Acudiente" name="responsible_adult" component={TextBase}
                                    //onClick={(event) => handleChangeresponsible_adult(event)} 
                                    />
                                </Grid>

                                <Grid item xs={6} md={6} xl={6}>
                                    <Field label="Documento del acudiente" name="responsible_adult_code" component={TextBase}
                                    //onClick={(event) => handleChangeresponsible_adult_code(event)} 
                                    />
                                </Grid>

                                <Grid item xs={6} md={6} xl={6}>
                                    <Field label="Parentesco" name="relationship" component={TextBase}
                                    //onClick={(event) => handleChangerelationship(event)} 
                                    />
                                </Grid>

                                <Grid item xs={6} md={6} xl={6}>
                                    <Field label="Telefono" name="responsible_adult_phone" component={TextBase}
                                    //onClick={(event) => handleChangeresponsible_adult_phone(event)} 
                                    />
                                </Grid>

                                <Grid item xs={6} md={6} xl={6}>
                                    <Field label="Celular" name="responsible_adult_cellphone" component={TextBase}
                                    //onClick={(event) => handleChangeresponsible_adult_cellphone(event)} 
                                    />
                                </Grid>

                                <Grid item xs={6} md={6} xl={6}>
                                    <Field label="Droga de impacto" name="drug_id" component={SelectBase} items={drugList}
                                    /*onOptionSelected={(selectedOption) => handleOnChangedrug_id(selectedOption, subProps)} */
                                    />
                                </Grid>

                                <Grid item xs={6} md={6} xl={6}>
                                    <Field label="Ubicacion (Tiempo - Espacio - Persona)" name="orientation" component={TextBase}
                                    //onClick={(event) => handleChangeorientation(event)} 
                                    />
                                </Grid>

                                <Grid item xs={6} md={6} xl={6}>
                                    <Field label="Lenguaje corporal" name="body_language" component={TextBase}
                                    //onClick={(event) => handleChangebody_language(event)} 
                                    />
                                </Grid>

                                <Grid item xs={6} md={6} xl={6}>
                                    <Field label="Ideacion o intento suicida" name="ideation" component={TextBase}
                                    //onClick={(event) => handleChangeideation(event)} 
                                    />
                                </Grid>

                                <Grid item xs={6} md={6} xl={6}>
                                    <Field label="Delirios" name="delusions" component={TextBase}
                                    //onClick={(event) => handleChangedelusions(event)} 
                                    />
                                </Grid>

                                <Grid item xs={6} md={6} xl={6}>
                                    <Field label="Alucinaciones" name="hallucinations" component={TextBase}
                                    //onClick={(event) => handleChangehallucinations(event)} 
                                    />
                                </Grid>

                                <Grid item xs={6} md={6} xl={6}>
                                    <Field label="Problemas de alimentacion" name="eating_problems" component={TextBase}
                                    //onClick={(event) => handleChangeeating_problems(event)} 
                                    />
                                </Grid>

                                <Grid item xs={6} md={6} xl={6}>
                                    <Field label="Motivacion al tratamiento" name="treatment_motivations" component={TextBase}
                                    //onClick={(event) => handleChangetreatment_motivations(event)} 
                                    />
                                </Grid>

                                <Grid item xs={6} md={6} xl={6}>
                                    <Field label="Fecha de Salida" name="end_date" component={DatePickerBase}
                                    //onClick={(event) => handleChangeend_date(event)} 
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} xl={6}>
                                    <Field label="Causa de salida" name="cause_of_end" component={SelectBase} items={cause_of_endList} />
                                </Grid>

                                <Grid item xs={6} md={6} xl={6}>
                                    <Field label="Fecha de Salida (Por segunda vez)" name="end_date_second" component={DatePickerBase}
                                    //onClick={(event) => handleChangeend_date_second(event)} 
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} xl={6}>
                                    <Field label="Causa de salida (Por segunda vez)" name="cause_of_end_second" component={SelectBase} items={cause_of_end_secondList} />
                                </Grid>

                                <Grid item xs={6} md={6} xl={6}>
                                    <Field label="Fecha de Salida (Por tercera vez)" name="end_date_third" component={DatePickerBase}
                                    //onClick={(event) => handleChangeend_date_third(event)} 
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} xl={6}>
                                    <Field label="Causa de salida (Por tercera vez)" name="cause_of_end_third" component={SelectBase} items={cause_of_end_thirdList} />
                                </Grid>

                                <Grid item xs={6} md={6} xl={6}>
                                    <Field label="Observaciones" name="comments" component={TextBase}
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

PatientsForm.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    doPost: PropTypes.func,
    doGet: PropTypes.func,
    doPut: PropTypes.func,
    doPostFormData: PropTypes.func,
    appInfo: PropTypes.func.isRequired,
    appSuccess: PropTypes.func.isRequired,
    genericException: PropTypes.func.isRequired,
    setEditable: PropTypes.func,
    refresh: PropTypes.oneOfType([PropTypes.object])
};

export default withApi(withNotification(PatientsForm));