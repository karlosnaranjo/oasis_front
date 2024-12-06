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


const validationSchema = Yup.object({
   	code: Yup.string().required('Codigo es requerido'),
	name: Yup.string().required('Nombre fase es requerido'),
	phase_id: Yup.string().required('Fase es requerido'),
	status: Yup.string().required('Estado es requerido'),
 
});

const urlBase = endPoints.masters.targets.base;

let phaseList = [];


const baseUrl = '/app/general/masters/targets';

const initState = {
    	code: false,
	name: false,
	phase_id: null,
	status: 1,

};

const selectMap = (data) => {
    return data.map((row) => ({ value: row.id, label: row.name }));
};

const TargetsForm = ({
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
        url: endPoints.masters.targets.initForm,
        data: id ? { id: id } : {}
    };
    const resp = await doGet(params);
    return resp;
    }, [doGet, id, refresh, setEditable]);

    const init = useCallback(async () => {
    try {
        const { targets, phase,  } = await loadFields();
phaseList = selectMap(phase);


        const {
code, name, phase_id, status, 
        } = targets;

        setState({
			code: code || "",
			name: name || "",
			phase_id: phase_id || null,
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
        const { code, name, phase_id, status,  } = values;
        return {
code, name, phase_id, status: getStatusValue(status), 
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
                            <Field label="Nombre fase" name="name" component={TextBase} 
                                //onClick={(event) => handleChangename(event)} 
                            />
                        </Grid>
            
                                <Grid item xs={6} md={6} xl={6}>
                                    <Field label="Fase" name="phase_id" component={SelectBase} items={phaseList}  
                                        /*onOptionSelected={(selectedOption) => handleOnChangephase_id(selectedOption, subProps)} */
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

TargetsForm.propTypes = {
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

export default withApi(withNotification(TargetsForm));