import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { Form, Field, Formik } from 'formik';
import * as Yup from 'yup';
import { TextBase, SelectBase,  Loader, ButtonSave, ButtonBase } from 'components';
import endPoints from 'endPoints/endPoints';
import messages from 'constantes/messages';
import { withApi, withNotification } from 'wrappers';
import { Box } from '@mui/system';
import { getStatusLabel, getStatusValue } from "utils/formHelpers";



const validationSchema = Yup.object({
	code: Yup.string().required('Codigo es requerido'),
	name: Yup.string().required('Nombre fase es requerido'),
	status: Yup.string().required('Estado es requerido'),
 
});

const urlBase = endPoints.masters.targets.base;



const initState = {
	code: false,
	name: false,
		status: 1,

};

const selectMap = (data) => {
    return data.map((row) => ({ value: row.id, label: row.name }));
};

const TargetsForm = ({
    id,
    phase_id,
    doGet,
    genericException,
    appSuccess,
    doPost,
    doPut,
    appInfo,
    setEditable,
    viewMode,
    setOpenModal,
    refreshData,
    refreshTable
    }) => {
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
    }, [doGet, id, setEditable]);

    const init = useCallback(async () => {
    try {
        const { targets,  } = await loadFields();


        const {
            code, name, status, 
        } = targets;

        setState({
            			code: code || "",
			name: name || "",
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

    const mapValues = (values) => {
        const { code, name, status,  } = values;
        return {
            phase_id: phase_id,
            code, name, status: getStatusValue(status), 
        };
    };

    const submit = async (valuesForm) => {
        const method = id ? doPut : doPost;
        const data = mapValues(valuesForm);
        const params = {
            url: `${urlBase}${id ? `/${id}` : ''}`,
            //url: id ? `${urlBase}/${id}` : urlBase,
            data: data
        };

        try {
            const resp = await method(params);
            if (id) {
                appInfo(messages.crud.update);
            } else {
                appSuccess(messages.crud.new);
            }
            refreshTable()
        } catch (error) {
            console.log('ERROR AL GUARDAR '+error);
            genericException(error);
        } finally {
            setOpenModal(false);
            refreshData.current.refresh();
        }
    };

    return (
    <Dialog fullWidth maxWidth="xl" open onClose={() => setOpenModal(false)} aria-labelledby="max-width-dialog-title">
        <DialogTitle id="max-width-dialog-title">Objetivos</DialogTitle>
        <DialogContent>
            
        {isLoading ? (
            <Box p={10}>
                <Loader />
            </Box>
        ) : (
            <Formik enableReinitialize initialValues={state} validationSchema={validationSchema} onSubmit={submit}>
                {(subProps) => (
                <Form>
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
            
                        <Grid item xs={12} md={6} xl={6}>
                            <Field label="Estado" name="status" component={TextBase} disabled={true} />
                        </Grid>
            
                    </Grid>
                    <Grid container direction="row" style={{ paddingTop: 30 }} justify="flex-end">
                        <Grid item>
                            <ButtonSave />
                            <ButtonBase
                                onClick={() => setOpenModal(false)}
                                label="Cancelar"
                                style={{ marginLeft: 15 }}
                            />
                        </Grid>
                    </Grid>
                </Form>
                )}
            </Formik>
        )}
       </DialogContent>
    </Dialog>
            
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