import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { Form, Field, Formik } from 'formik';
import * as Yup from 'yup';
import { SelectBase, TextBase,  Loader, ButtonSave, ButtonBase } from 'components';
import endPoints from 'endPoints/endPoints';
import messages from 'constantes/messages';
import { withApi, withNotification } from 'wrappers';
import { Box } from '@mui/system';
import { getStatusLabel, getStatusValue } from "utils/formHelpers";



const validationSchema = Yup.object({
	name: Yup.string().required('Nombres y Apellidos es requerido'),
	relative_id: Yup.string().required('Parentesco es requerido'),
	age: Yup.string().required('Edad es requerido'),
	relationship_type: Yup.string().required('Tipo de relacion es requerido'),
 
});

const urlBase = endPoints.transactions.psychologyRelatives.base;

let relativeList = [];
let relationship_typeList = [{"label":"Estrecha","value":"Estrecha"},{"label":"Cercana","value":"Cercana"},{"label":"Distante","value":"Distante"}];


const initState = {
		name: false,
	relative_id: null,
	age: false,
	relationship_type: "",

};

const selectMap = (data) => {
    return data.map((row) => ({ value: row.id, label: row.name }));
};

const PsychologyRelativesForm = ({
    id,
    psychology_id,
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
        url: endPoints.transactions.psychologyRelatives.initForm,
        data: id ? { id: id } : {}
    };
    const resp = await doGet(params);
    return resp;
    }, [doGet, id, setEditable]);

    const init = useCallback(async () => {
    try {
        const { psychologyRelatives, relative,  } = await loadFields();
relativeList = selectMap(relative);


        const {
            name, relative_id, age, relationship_type, 
        } = psychologyRelatives;

        setState({
            						name: name || "",
			relative_id: relative_id || null,
			age: age || "",
			relationship_type: relationship_type || "",

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
        const { name, relative_id, age, relationship_type,  } = values;
        return {
            psychology_id: psychology_id,
            name, relative_id, age, relationship_type, 
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
        <DialogTitle id="max-width-dialog-title">Historia Familiar</DialogTitle>
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
                            <Field label="Nombres y Apellidos" name="name" component={TextBase} 
                                //onClick={(event) => handleChangename(event)} 
                            />
                        </Grid>
            
                                <Grid item xs={6} md={6} xl={6}>
                                    <Field label="Parentesco" name="relative_id" component={SelectBase} items={relativeList}  
                                        /*onOptionSelected={(selectedOption) => handleOnChangerelative_id(selectedOption, subProps)} */
                                    />
                                </Grid>
                    
                        <Grid item xs={6} md={6} xl={6}>
                            <Field label="Edad" name="age" component={TextBase} 
                                //onClick={(event) => handleChangeage(event)} 
                            />
                        </Grid>
            
                        <Grid item xs={12} md={6} xl={6}>
                            <Field label="Tipo de relacion" name="relationship_type" component={SelectBase}  items={relationship_typeList} />
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

PsychologyRelativesForm.propTypes = {
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

export default withApi(withNotification(PsychologyRelativesForm));